import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Arwa from '../../../public/assets/main-page.png';
import { Button } from '../Button';

import styles from './styles.module.scss';

const Main: React.FC = () => {
  const { push } = useRouter();

  const go = (url: string) => {
    return async () => await push(url);
  };

  return (
    <div className={styles.main}>
      <Image className={styles.main_image} src={Arwa} alt={'Arwa'} />
      <div className={styles.buttonContainer}>
        <span>Start your journey now!</span>
        <Button color="white" onClick={go('/create')}>
          Tokenise your property
        </Button>
      </div>
    </div>
  );
};

export default Main;
