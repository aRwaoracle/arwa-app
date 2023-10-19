import { memo, useEffect, useMemo, useState } from 'react';

import { useArwaUser } from '@/hooks/blockchain/manager/use-arwa-user';

import CardProfile from '../CardProfile';

const PropertyCards = (): JSX.Element => {
  const [isClient, setIsClient] = useState(false);
  const { userProperties, verifierProperties, isVerifier } = useArwaUser();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const properties = useMemo(() => {
    return isVerifier ? verifierProperties : userProperties;
  }, [userProperties, verifierProperties, isVerifier]);

  return (
    <div className="gap-3 grid grid-cols-2 sm:grid-cols-4">
      {isClient && (
        <>
          <>
            {properties?.map((property, index) => (
              <CardProfile
                property={property}
                key={index}
                isVerifier={isVerifier as boolean}
              />
            ))}
          </>
          <>
            {properties?.length === 0 && (
              <p>
                No tokens yet! Click button above to create your first property!
              </p>
            )}
          </>
        </>
      )}
    </div>
  );
};

export default memo(PropertyCards);
