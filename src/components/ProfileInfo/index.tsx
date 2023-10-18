import { memo } from 'react';
import { useDisclosure } from '@nextui-org/modal';
import { useAccount } from 'wagmi';

import Avatar from '@/components/Avatar';
import { useKycManager } from '@/hooks/blockchain/use-kyc-manager';

import Balance from '../Balance';
import { Button } from '../Button';
import ProfileModal from '../ProfileModal';

import styles from './styles.module.scss';

const ProfileInfo = (): JSX.Element => {
  const { address } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isKycPassed, isLoading } = useKycManager();
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
          {!isKycPassed && (
            <Button color="var(--main-color)" onClick={onOpen}>
              <p>Pass KYC</p>
            </Button>
          )}
        </div>
        <div className={styles.kycContainer}>
          {isLoading ? (
            <p>Loading..</p>
          ) : (
            <p
              style={{
                color: isKycPassed ? 'rgb(8, 216, 84) ' : 'rgb(219, 7, 7)',
              }}
            >
              {isKycPassed ? 'Kyc passed' : 'Kyc not passed'}
            </p>
          )}
        </div>
      </div>
      <ProfileModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default memo(ProfileInfo);
