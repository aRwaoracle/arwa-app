import React, { memo, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Image from 'next/image';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/modal';
import { Progress } from '@nextui-org/progress';
import { motion } from 'framer-motion';
import * as Yup from 'yup';

import CustomInput from '../CustomInput';

import styles from './styles.module.scss';

import documentIcon from '/public/assets/doc.svg';

type TProfileModal = {
  isOpen: boolean;
  onClose: () => void;
};

type FormState = {
  name: string;
  surname: string;
};

const schemaUser = Yup.object().shape({
  name: Yup.string()
    .matches(/[^\d\s]/g)
    .required(),
  surname: Yup.string()
    .matches(/[^\d\s]/g)
    .required(),
});

const ProfileModal: React.FC<TProfileModal> = ({
  isOpen,
  onClose,
}): JSX.Element => {
  const {
    control,
    formState: { errors },
    getValues,
    watch,
  } = useForm<FormState>({
    resolver: yupResolver(schemaUser),
    mode: 'onChange',
  });
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const changePhoto = (event): void => {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = (): void => {
      setImage(reader.result ? reader.result.toString() : '');
    };
    reader.readAsDataURL(file);
  };

  const handleClick = (): void => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  useEffect(() => {
    if (watch('name') === '') {
      setProgress((previous) => previous - 33);
    } else {
      setProgress((previous) => previous + 33);
    }
  }, [watch('name')]);
  useEffect(() => {
    if (watch('surname') === '') {
      setProgress((previous) => previous - 33);
    } else {
      setProgress((previous) => previous + 33);
    }
  }, [watch('surname')]);
  useEffect(() => {
    if (image === '') {
      setProgress((previous) => previous - 33);
    } else {
      setProgress((previous) => previous + 33);
    }
  }, [watch('name')]);

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton
      className={styles.container}
    >
      <ModalContent className="gap-3">
        <ModalHeader className="flex flex-col items-center gap-5">
          <p className={`${styles.header} font-orbitron`}>Pass KYC</p>
          <Progress
            aria-label="Loading..."
            value={60}
            className="max-w-md"
            classNames={{ base: 'bg-white/70 rounded-md	' }}
          />
          <motion.div
            whileHover={{ scale: 1.05, opacity: 0.7 }}
            onClick={handleClick}
            className="cursor-pointer"
          >
            <Image
              src={documentIcon}
              alt="Avatar"
              width={150}
              height={150}
              className={styles.avatarContainer}
            />
            <input
              onChange={changePhoto}
              type="file"
              style={{ display: 'none' }}
              ref={hiddenFileInput}
            />
          </motion.div>
        </ModalHeader>
        <ModalBody className="gap-9">
          <Controller
            control={control}
            render={({ field: { onChange, value } }): JSX.Element => (
              <CustomInput
                key={'outside'}
                type="text"
                label="Name"
                onChange={onChange}
                value={value}
                errorMessage="Please enter a valid name"
                error={Boolean(errors.name)}
              />
            )}
            name="name"
          />
          <Controller
            control={control}
            render={({ field: { onChange, value } }): JSX.Element => (
              <CustomInput
                key={'outside'}
                type="text"
                label="Surname"
                onChange={onChange}
                value={value}
                errorMessage="Please enter a valid name"
                error={Boolean(errors.surname)}
              />
            )}
            name="surname"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
          <Button
            color="primary"
            onPress={() => {
              onClose();
              console.log(getValues('name'));
            }}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default memo(ProfileModal);