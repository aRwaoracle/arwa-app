import { FC, useEffect, useState } from 'react';

import { useKycManager } from '@/hooks/blockchain/use-kyc-manager';

import styles from './styles.module.scss';
const Profile: FC = () => {
  const { isKycPassed, isLoading, updateKyc } = useKycManager();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <p>Text</p>
        <div>
          {isClient ? (
            <>
              {isLoading ? (
                <p>Loading</p>
              ) : (
                <p>{isKycPassed ? 'Kyc passed' : 'Kyc not passed'}</p>
              )}
            </>
          ) : (
            <p>Server text</p>
          )}
        </div>
        <button onClick={updateKyc}>Update state</button>
      </div>
    </div>
  );
};

export default Profile;
