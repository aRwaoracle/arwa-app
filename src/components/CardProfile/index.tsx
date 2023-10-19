import { memo, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Image } from '@nextui-org/image';

import {
  AddressType,
  AddressZero,
  PropertyStatus,
  PropertyType,
  StatusToText,
} from '@/data';
import { useProperty } from '@/hooks/blockchain/manager/use-property';
import { useVerifierActions } from '@/hooks/blockchain/manager/use-verifier-actions';
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
  const { mintTokens, getPropertyCollectionInfo } = useProperty();
  const { acceptProperty: _acceptProperty } = useVerifierActions();
  const [load, setload] = useState(false);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const acceptProperty = async (id: number) => {
    const { hash } = await _acceptProperty(id, 1_000_000_000_000_000); //wei
    console.log({ hash });
  };
  const mint = async (collectionAddress: AddressType): Promise<void> => {
    const hash = await mintTokens(collectionAddress, 20);
    console.log({ hash });
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const handleLoad = (info): void => {
    if (info) {
      setload(true);
    }
  };

  const memorizedImage = useMemo(
    () => (
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
    ),
    [load],
  );

  const memorizedAdress = useMemo(
    () => (
      <>
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
      </>
    ),
    [property.collectionAddress],
  );

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

  return (
    <Card
      shadow="sm"
      onPress={(): void => console.log('item pressed')}
      className="w-full bg-[var(--main-card-color)] cursor-default pb-2"
    >
      <CardBody className="overflow-visible p-0 shadow-lg">
        <Skeleton isLoaded={load}>{memorizedImage}</Skeleton>
      </CardBody>
      <CardFooter className="flex-col items-start gap-1">
        <p className="text-default-500 text-xl">{property.name}</p>
        <div className="flex flex-row text-small justify-between w-full mt-3 items-center">
          <p className="text-white">Status:</p>
          <Button color={StatusToColor[property.status]} disabled size="sm">
            {StatusToText[property.status]}
          </Button>
        </div>
        {memorizedAdress}
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
        {/* <Button onClick={(): Promise<void> => acceptProperty(property.id)}>
          Accept property by verifier only!
        </Button>
        <div className="gap-2 flex flex-col mt-8 items-center w-full">
          <Button color="danger" variant="light">
            Sell property
          </Button>
          <Button color="primary">Buy more</Button>
          {property.collectionAddress && (
            <>
              <Button
                color="primary"
                onClick={(): Promise<void> => mint(property.collectionAddress)}
              >
                Mint
              </Button>
              <Button
                color="primary"
                onClick={(): Promise<void> =>
                  collectionInfo(property.collectionAddress)
                }
              >
                Get collectionInfo
              </Button>
            </>
          )}
        </div> */}
      </CardFooter>
    </Card>
  );
};

export default memo(CardProfile);
