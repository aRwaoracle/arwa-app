import React, { useEffect } from 'react';

import Main from '@/components/Main';
import { useArwaUser } from '@/hooks/blockchain/manager/use-arwa-user';

export default function IndexPage(): React.ReactNode {
  const { isVerifier, userProperties } = useArwaUser();

  useEffect(() => {
    console.log(isVerifier, userProperties);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Main />
    </div>
  );
}
