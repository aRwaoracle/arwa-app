import { FC } from 'react';

import MarketCards from '@/components/MarketCards';

import styles from './styles.module.scss';

const Market: FC = () => {
  return (
    <div className={styles.main}>
      <div>
        <p className={styles.tokenText}>Marketplace</p>
        <MarketCards />
      </div>
    </div>
  );
};

export default Market;
