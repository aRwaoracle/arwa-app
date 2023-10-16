import { memo, useEffect, useState } from 'react';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Image } from '@nextui-org/image';

import styles from './styles.module.scss';

const PropertyCards = (): JSX.Element => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="gap-3 grid grid-cols-2 sm:grid-cols-4">
      {isClient && (
        <>
          {[...Array.from({ length: 10 }).keys()].map((_, index) => (
            <Card
              shadow="sm"
              key={index}
              isPressable
              onPress={(): void => console.log('item pressed')}
              className={styles.cardContainer}
            >
              <CardBody className="overflow-visible p-0 shadow-lg">
                <Image
                  removeWrapper
                  radius="none"
                  alt={'home'}
                  className="z-0 w-full h-full object-cover"
                  src="https://grafit-art.com/assets/private/1Folder/1.webp"
                />
              </CardBody>
              <CardFooter className="flex-col items-start gap-1">
                <p className="text-default-500 text-xl">Karra Loft 3A</p>
                <p className="text-default-500 text-sm">Indonesia, Bali</p>
                <div className="flex flex-row text-small justify-between w-full mt-3">
                  <p className="text-white">Tokens</p>
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
