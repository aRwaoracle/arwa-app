import { memo } from 'react';
import { useDisclosure } from '@nextui-org/modal';
import { useAccount } from 'wagmi';

import Avatar from '@/components/Avatar';

import Balance from '../Balance';
import { Button } from '../Button';
import KYCContainer from '../KYCContainer';
import ProfileModal from '../ProfileModal';

import styles from './styles.module.scss';

const ProfileInfo = (): JSX.Element => {
  const { address } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className={styles.mainContainer}>
      <Avatar
        profileImage={address || ''}
        className={styles.avatarContainer}
        size={150}
      />
      <div className={styles.infoContainer}>
        <div className="flex flex-row justify-between">
          <Balance />
          <Button color="var(--main-color)" onClick={onOpen}>
            <p>Update profile info</p>
          </Button>
        </div>
        <KYCContainer />
      </div>
      <ProfileModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default memo(ProfileInfo);
