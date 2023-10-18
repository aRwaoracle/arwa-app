import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useProperty } from '@/hooks/blockchain/manager/use-property';
import { useVerifierActions } from '@/hooks/blockchain/manager/use-verifier-actions';

import Arwa from '../../../public/assets/main-page.png';
import { Button } from '../Button';

import styles from './styles.module.scss';

const Main: React.FC = () => {
  const { createProperty, getPropertyInfo } = useProperty();
  const { acceptProperty: _acceptProperty } = useVerifierActions();
  const { push } = useRouter();

  const go = (url: string) => {
    return async () => await push(url);
  };
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onClick = async () => {
    const hash = await createProperty(
      'TestArwa',
      'https://github.com/aRwaoracle',
      'TESTARWA',
    );

    console.log({ hash });
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const logProperties = async () => {
    console.log(await getPropertyInfo(0));
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const acceptProperty = async () => {
    const { hash } = await _acceptProperty(0, 1_000_000_000_000_000);
    console.log({ hash });
  };

  console.log({ onClick, logProperties, acceptProperty });

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <Image className={styles.main_image} src={Arwa} alt={'Arwa'} />
      </div>
      <div className={styles.buttonContainer}>
        {/* <Button color="var(--main-color)" onClick={onClick}>
          Tokenise your property
        </Button> */}
        <Button color="white" onClick={go('/create')}>
          Tokenise your property
        </Button>

        {/* <Button color="var(--main-color)" onClick={logProperties}>
          Log your property
        </Button>

        <Button color="var(--main-color)" onClick={acceptProperty}>
          Accept property by verifier only!
        </Button> */}
      </div>
    </div>
  );
};

export default Main;
