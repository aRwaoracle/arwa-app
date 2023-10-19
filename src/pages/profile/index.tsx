import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@nextui-org/button';

import ProfileInfo from '@/components/ProfileInfo';
import ProfileCards from '@/components/PropertyCards';

import styles from './styles.module.scss';

const Profile: FC = () => {
  const { push } = useRouter();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const go = (url: string) => {
    return async () => await push(url);
  };

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <div>{isClient && <ProfileInfo />}</div>
      </div>
      {isClient && (
        <div>
          <div className="flex flex-row w-full justify-between items-center">
            <p className={styles.tokenText}>Your tokens</p>
            <Button onClick={go('/create')} color="danger">
              Create new
            </Button>
          </div>
          <ProfileCards />
        </div>
      )}
    </div>
  );
};

export default Profile;
