import { memo, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@nextui-org/button';
import { Tab, Tabs } from '@nextui-org/tabs';

import { useArwaUser } from '@/hooks/blockchain/manager/use-arwa-user';
import { useFilterCards } from '@/hooks/interface/use-filter-cards';

import CardProfile from '../CardProfile';

const PropertyCards = (): JSX.Element => {
  const { push } = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { userProperties, isVerifier } = useArwaUser();

  const [category, setCategory] = useState('0');

  const filteredProperty = useFilterCards(category);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const properties = useMemo(() => {
    return isVerifier ? filteredProperty : userProperties;
  }, [userProperties, filteredProperty, isVerifier]);

  const go = (url: string) => {
    return async () => await push(url);
  };

  return (
    <div>
      <div className="flex flex-row w-full justify-between items-start">
        <p className="text-[var(--main-text-color)] mb-10 text-3xl">
          {isVerifier ? 'Tokens' : 'Your tokens'}
        </p>
        {isVerifier ? (
          <Tabs
            size="md"
            aria-label="Tabs sizes"
            selectedKey={category}
            onSelectionChange={(key): void => setCategory(key as string)}
            classNames={{ tabList: 'bg-[var(--main-card-color)]' }}
          >
            <Tab title="All" key={0} />
            <Tab title="Accepted" key={1} />
            <Tab title="Pending" key={2} />
            <Tab title="Rejected" key={3} />
          </Tabs>
        ) : (
          <Button onClick={go('/create')} color="danger">
            Create new
          </Button>
        )}
      </div>
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
                  No tokens yet! Click button above to create your first
                  property!
                </p>
              )}
            </>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(PropertyCards);
