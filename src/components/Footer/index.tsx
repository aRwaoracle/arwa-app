import { FC } from 'react';

import styles from './styles.module.scss';

const Footer: FC = () => {
  return (
    <div className={styles.footer}>
      {`Ethonline`} &#xa9; {`${new Date().getFullYear()} aRwa`}
    </div>
  );
};

export default Footer;
