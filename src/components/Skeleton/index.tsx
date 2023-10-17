import React from 'react';
import { Skeleton as SkeletonNext } from '@nextui-org/skeleton';

type TSkeleton = {
  children: React.ReactNode;
  isLoaded: boolean;
  className?: string | undefined;
};

const Skeleton: React.FC<TSkeleton> = ({ children, isLoaded, className }) => {
  return (
    <SkeletonNext
      isLoaded={isLoaded}
      className={`${className}`}
      classNames={{ base: 'bg-black', content: 'bg-transparent' }}
    >
      {children}
    </SkeletonNext>
  );
};

export default React.memo(Skeleton);
