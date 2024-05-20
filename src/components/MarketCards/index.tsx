import { memo, useEffect, useState } from 'react';
import { Card, CardBody, CardFooter } from '@nextui-org/card';

import Carousel from '../Carousel';

import styles from './styles.module.scss';
const MarketCards = (): JSX.Element => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const images = [
    'https://img.freepik.com/free-photo/3d-rendering-house-model_23-2150799627.jpg?t=st=1697384061~exp=1697387661~hmac=dfc68101004a144fc8b1d9db5adcd73b8522defb78b64db1bb087ccb13754c4f&w=1480',
    'https://img.freepik.com/free-photo/modern-residential-district-with-green-roof-balcony-generated-by-ai_188544-10276.jpg?size=626&ext=jpg&ga=GA1.2.663633836.1697379764&semt=ais',
  ];

  return (
    <div className="gap-3 grid grid-cols-1 ">
      {isClient && (
        <>
          {[...Array.from({ length: 2 }).keys()].map((_, index) => (
            <Card shadow="sm" key={index} className={styles.cardContainer}>
              <div className="flex flex-col sm:flex-row">
                <CardBody className="rounded-2xl overflow-visible shadow-lg  w-full sm:w-1/2">
                  <Carousel images={images} />
                </CardBody>
                <CardFooter className="flex-col items-start gap-4 w-1/2 p-4">
                  <div>
                    <p className="text-default-500 text-xl">Karra Loft 3A</p>
                    <p className="text-default-500 text-sm">Indonesia, Bali</p>
                  </div>
                  <div>
                    <p className="text-default-500 text-xl">Object Price</p>
                    <p className="text-white">$220,000</p>
                  </div>
                  <div>
                    <p className="text-default-500 text-xl">Token Price</p>
                    <p className="text-white">$50</p>
                  </div>
                </CardFooter>
              </div>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};

export default memo(MarketCards);
