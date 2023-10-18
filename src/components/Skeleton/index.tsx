import React from 'react';
import { Skeleton as SkeletonNext } from '@nextui-org/skeleton';

import styles from './styles.module.scss';

type TSkeleton = {
  children: React.ReactNode;
  isLoaded: boolean;
  className?: string | undefined;
};

const Skeleton: React.FC<TSkeleton> = ({ children, isLoaded, className }) => {
  return (
    <div>
      {!isLoaded && <p className={`${styles.text} text-white`}>Loading</p>}
      <SkeletonNext isLoaded={isLoaded} className={`${className} dark`}>
        {children}
      </SkeletonNext>
    </div>
  );
};

export default React.memo(Skeleton);
