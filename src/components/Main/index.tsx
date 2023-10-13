import React from 'react';

import { Button } from '../Button';

import styles from './styles.module.scss';

const Main: React.FC = () => {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <p>Text</p>
      </div>
      <div className={styles.buttonContainer}>
        <Button color="var(--main-color)">Tokenise your property</Button>
      </div>
    </div>
  );
};

export default Main;
