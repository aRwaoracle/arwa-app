import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Arwa from '../../../public/assets/aRwa_logo.png';
import ConnectionButton from '../ConnectionButton';

import styles from './styles.module.scss';

const Header: FC = () => {
  return (
    <div className={styles.header}>
      <Link href={'/'} className={styles.link}>
        <Image className={styles.header_image} src={Arwa} alt={'Arwa'} />
        aRwaoracle
      </Link>
      <Link className={styles.market} href={'market'}>
        Market
      </Link>

      <div>
        <ConnectionButton />
      </div>
    </div>
  );
};

export default Header;
