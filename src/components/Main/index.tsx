import React from 'react';

import { useProperty } from '@/hooks/blockchain/manager/use-property';
import { useVerifierActions } from '@/hooks/blockchain/manager/use-verifier-actions';

import { Button } from '../Button';

import styles from './styles.module.scss';

const Main: React.FC = () => {
  const { createProperty, getPropertyInfo } = useProperty();
  const { acceptProperty: _acceptProperty } = useVerifierActions();

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

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <p>Text</p>
      </div>
      <div className={styles.buttonContainer}>
        <Button color="var(--main-color)" onClick={onClick}>
          Tokenise your property
        </Button>

        <Button color="var(--main-color)" onClick={logProperties}>
          Log your property
        </Button>

        <Button color="var(--main-color)" onClick={acceptProperty}>
          Accept property by verifier only!
        </Button>
      </div>
    </div>
  );
};

export default Main;
