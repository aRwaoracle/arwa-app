import React, { memo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/modal';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import * as Yup from 'yup';

import Avatar from '@/components/Avatar';

import CustomInput from '../CustomInput';

import styles from './styles.module.scss';

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
  } = useForm<FormState>({
    resolver: yupResolver(schemaUser),
    mode: 'onChange',
  });
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);
  const { address } = useAccount();
  const [image, setImage] = useState<string>(address || '');
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

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton
      className={styles.container}
    >
      <ModalContent className="gap-3">
        <ModalHeader className="flex flex-col items-center gap-3">
          <p className={`${styles.header} font-orbitron`}>Profile Info</p>
          <motion.div
            whileHover={{ scale: 1.05, opacity: 0.7 }}
            onClick={handleClick}
            className="cursor-pointer"
          >
            <Avatar
              profileImage={image || ''}
              className={styles.avatarContainer}
              size={150}
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
          <Button color="primary" onPress={onClose}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default memo(ProfileModal);
