import React, { useEffect } from 'react';
import { useNetwork } from 'wagmi';

import Main from '@/components/Main';
import { useArwaUser } from '@/hooks/blockchain/manager/use-arwa-user';

export default function IndexPage(): React.ReactNode {
  const { isVerifier, userProperties } = useArwaUser(); // add to profile
  const { chains } = useNetwork();

  useEffect(() => {
    console.log(isVerifier, userProperties);
    console.log({ chains });
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Main />
    </div>
  );
}
