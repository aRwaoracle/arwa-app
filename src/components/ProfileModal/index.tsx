import React, { memo } from 'react';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/modal';

type TProfileModal = {
  isOpen: boolean;
  onClose: () => void;
};

const ProfileModal: React.FC<TProfileModal> = ({
  isOpen,
  onClose,
}): JSX.Element => {
  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} hideCloseButton>
      <ModalContent>
        <ModalHeader>
          <p className="font-orbitron">Profile Info</p>
        </ModalHeader>
        <ModalBody>
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            className="font-orbitron"
          />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
            hendrerit risus, sed porttitor quam.
          </p>
          <p>
            Magna exercitation reprehenderit magna aute tempor cupidatat
            consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
            incididunt cillum quis. Velit duis sit officia eiusmod Lorem aliqua
            enim laboris do dolor eiusmod. Et mollit incididunt nisi consectetur
            esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
            deserunt nostrud ad veniam.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" onPress={onClose}>
            Action
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default memo(ProfileModal);
