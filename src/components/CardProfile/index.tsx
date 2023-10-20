import { memo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';

import {
  AddressZero,
  PropertyStatus,
  PropertyType,
  StatusToText,
} from '@/data';
import { startAndEnd, StatusToColor } from '@/utils';

import Skeleton from '../Skeleton';

type TCardProfile = {
  property: PropertyType;
  isVerifier: boolean;
};

const adressLenght = 6;

const CardProfile: React.FC<TCardProfile> = ({
  property,
  isVerifier,
}): JSX.Element => {
  const { push } = useRouter();
  const [load, setload] = useState(false);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const handleLoad = (info): void => {
    if (info) {
      setload(true);
    }
  };

  const goWithQuery = (url: string): (() => Promise<boolean>) => {
    return async () =>
      await push({
        pathname: url,
        query: { id: Number(property.id) },
      });
  };

  const needVerify =
    isVerifier &&
    (property.status === PropertyStatus.Pending ||
      property.status === PropertyStatus.Shipped);
  const canMint = !isVerifier && property.status === PropertyStatus.Accepted;

  return (
    <Card
      shadow="sm"
      onPress={(): void => console.log('item pressed')}
      className="w-full bg-[var(--main-card-color)] cursor-default pb-2"
    >
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
      <CardBody className="flex-col items-start gap-1">
        <p className="text-default-500 text-xl">{property.name}</p>
        <div className="flex flex-row text-small justify-between w-full mt-3 items-center">
          <p className="text-white">Status:</p>
          <Button color={StatusToColor[property.status]} disabled size="sm">
            {StatusToText[property.status]}
          </Button>
        </div>
        {property.collectionAddress !== AddressZero && (
          <div className="flex flex-row text-small justify-between w-full mt-3">
            <p className="text-white">Collection address:</p>
            <Link
              className="text-white text-ellipsis"
              href={`https://goerli.etherscan.io/address/${property.collectionAddress}`}
              target="_blank"
            >
              {startAndEnd(property.collectionAddress, adressLenght)}
            </Link>
          </div>
        )}
        <div className="flex flex-row text-small justify-between w-full mt-3">
          <p className="text-white">Symbol:</p>
          <p className="text-white"> {property.symbol}</p>
        </div>
        {needVerify && (
          <Button
            color="primary"
            onPress={goWithQuery('/approve')}
            className="align-middle w-full mt-4"
          >
            Take to work
          </Button>
        )}
        {canMint && (
          <Button
            color="primary"
            onPress={goWithQuery('/mint')}
            className="align-middle w-full mt-4"
          >
            Mint
          </Button>
        )}
      </CardBody>
    </Card>
  );
};

export default memo(CardProfile);
