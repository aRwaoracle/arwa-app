import { memo, useEffect, useState } from 'react';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Image } from '@nextui-org/image';

import { AddressType, StatusToText } from '@/data';
import { useArwaUser } from '@/hooks/blockchain/manager/use-arwa-user';
import { useProperty } from '@/hooks/blockchain/manager/use-property';

import Skeleton from '../Skeleton';

import styles from './styles.module.scss';

const PropertyCards = (): JSX.Element => {
  const [isClient, setIsClient] = useState(false);
  const [load, setload] = useState(false);
  const { userProperties } = useArwaUser();
  const { mintTokens, getPropertyCollectionInfo } = useProperty();

  useEffect(() => {
    setIsClient(true);
  }, []);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const handleLoad = (info): void => {
    if (info) {
      setload(true);
    }
  };

  const mint = async (collectionAddress: AddressType): Promise<void> => {
    const hash = await mintTokens(collectionAddress, 20);
    console.log({ hash });
  };

  const collectionInfo = async (
    collectionAddress: AddressType,
  ): Promise<void> => {
    const result = await getPropertyCollectionInfo(collectionAddress);
    console.log({ result });
  };

  return (
    <div className="gap-3 grid grid-cols-2 sm:grid-cols-4">
      {isClient && (
        <>
          {userProperties.map((property, index) => (
            <Card
              shadow="sm"
              key={index}
              isPressable
              onPress={(): void => console.log('item pressed')}
              className={styles.cardContainer}
            >
              <CardBody className="overflow-visible p-0 shadow-lg">
                <Skeleton isLoaded={load}>
                  <Image
                    removeWrapper
                    radius="none"
                    alt={'home'}
                    className="z-0 w-full h-full object-cover"
                    src="https://app.requestly.io/delay/5000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                    onLoad={handleLoad}
                    width={100}
                    height={65}
                  />
                </Skeleton>
              </CardBody>
              <CardFooter className="flex-col items-start gap-1">
                <p className="text-default-500 text-xl">{property.name}</p>
                <p className="text-default-500 text-sm">{property.id}</p>
                <p className="text-default-500 text-sm">{property.docs}</p>
                <p className="text-default-500 text-sm">
                  {property.collectionAddress}
                </p>
                <p className="text-default-500 text-sm">{property.verifier}</p>
                <p className="text-default-500 text-sm">
                  {StatusToText[property.status]}
                </p>
                <p className="text-default-500 text-sm">{property.owner}</p>
                <div className="flex flex-row text-small justify-between w-full mt-3">
                  <Skeleton isLoaded={load} className="rounded-lg">
                    <p className="text-white">Tokens</p>
                  </Skeleton>
                  <p className="text-white">3/4000</p>
                </div>
                <div className="flex flex-row text-small justify-between w-full">
                  <p className="text-white">Current value</p>
                  <p className="text-white">0.015 ETH</p>
                </div>
                <div className="flex flex-row text-small justify-between w-full">
                  <p className="text-white">Claimed value</p>
                  <p className="text-white">0.00003 ETH</p>
                </div>
                <div className="gap-2 flex flex-col mt-8 items-center w-full">
                  <Button color="danger" variant="light">
                    Sell property
                  </Button>
                  <Button color="primary">Buy more</Button>
                  {property.collectionAddress && (
                    <>
                      <Button
                        color="primary"
                        onClick={() => mint(property.collectionAddress)}
                      >
                        Mint
                      </Button>
                      <Button
                        color="primary"
                        onClick={() =>
                          collectionInfo(property.collectionAddress)
                        }
                      >
                        Get collectionInfo
                      </Button>
                    </>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};

export default memo(PropertyCards);
