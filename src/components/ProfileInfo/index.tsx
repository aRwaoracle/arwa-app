import { memo } from 'react';
import { useAccount } from 'wagmi';

import Avatar from '@/components/Avatar';

import Balance from '../Balance';
import KYCContainer from '../KYCContainer';

import styles from './styles.module.scss';

const ProfileInfo = (): JSX.Element => {
  const { address } = useAccount();

  return (
    <div className={styles.mainContainer}>
      <Avatar
        profileImage={address || ''}
        className={styles.avatarContainer}
        size={150}
      />
      <div className={styles.infoContainer}>
        <Balance />
        <KYCContainer />
      </div>
    </div>
  );
};

export default memo(ProfileInfo);
