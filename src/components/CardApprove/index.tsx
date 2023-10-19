import { memo, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Input } from '@nextui-org/input';
import { Link } from '@nextui-org/link';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';
import * as Yup from 'yup';

import { PropertyType, StatusToText } from '@/data';
import { useProperty } from '@/hooks/blockchain/manager/use-property';
import { useVerifierActions } from '@/hooks/blockchain/manager/use-verifier-actions';
import { StatusToColor } from '@/utils';

import Skeleton from '../Skeleton';

type TCardProfile = {
  id: number;
};

type FormState = {
  amount: string;
};

const ethToWei = 1_000_000_000_000_000_000;

const schemaUser = Yup.object().shape({
  amount: Yup.string()
    // eslint-disable-next-line security/detect-unsafe-regex
    .matches(/(?<!-)(?<!\d)[1-9]\d*(?:\.\d{0,2})?/)
    // eslint-disable-next-line no-magic-numbers
    .max(14)
    .min(1)
    .required(),
});

const CardApprove: React.FC<TCardProfile> = ({ id }): JSX.Element => {
  const { push } = useRouter();

  const { getPropertyInfo } = useProperty();
  const { acceptProperty: _acceptProperty, rejectProperty: _rejectProperty } =
    useVerifierActions();

  const [load, setload] = useState(false);
  const [property, setProperty] = useState<PropertyType>();

  const loaded = property !== undefined;

  const {
    control,
    formState: { errors, isValid },
    getValues,
  } = useForm<FormState>({
    resolver: yupResolver(schemaUser),
    mode: 'onChange',
  });

  const go = (url: string) => {
    return async () => await push(url);
  };

  const acceptProperty = async (): Promise<void> => {
    const { hash } = await _acceptProperty(
      id,
      Number(getValues('amount')) * ethToWei,
    ); //wei
    console.log({ hash });
    go('/profile');
  };
  const rejectProperty = async (): Promise<void> => {
    const { hash } = await _rejectProperty(id);
    console.log({ hash });
    go('/profile');
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const handleLoad = (info): void => {
    if (info) {
      setload(true);
    }
  };

  useEffect(() => {
    const propertyInfo = async (): Promise<void> => {
      const result = await getPropertyInfo(id);
      setProperty(result);
    };
    propertyInfo();
  }, []);

  return (
    <Card
      shadow="sm"
      onPress={(): void => console.log('item pressed')}
      className="w-full bg-[var(--main-card-color)] cursor-default"
    >
      <CardBody className="flex-col items-start gap-10 dark">
        {loaded && (
          <Table
            isStriped
            hideHeader
            shadow="lg"
            aria-label="Example static collection table"
            classNames={{ wrapper: 'bg-[var( --main-card-color)]' }}
          >
            <TableHeader>
              <TableColumn>type</TableColumn>
              <TableColumn>value</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>
                  <p className="text-default-500 text-5xl">{property.name}</p>
                </TableCell>
                <TableCell>
                  <Button
                    color={StatusToColor[property.status]}
                    className="w-1/2"
                    disabled
                  >
                    {StatusToText[property.status]}
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>
                  <p className="text-default-500 text-3xl">Image:</p>
                </TableCell>
                <TableCell className="overflow-visible p-3 shadow-lg">
                  <Skeleton isLoaded={load}>
                    <Image
                      removeWrapper
                      radius="lg"
                      alt={'home'}
                      className="z-0 w-6/12	 h-w-6/12	 object-cover"
                      src="https://app.requestly.io/delay/5000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                      onLoad={handleLoad}
                      width={100}
                      height={65}
                    />
                  </Skeleton>
                </TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell>
                  <p className="text-default-500 text-3xl">Link to docs:</p>
                </TableCell>
                <TableCell>
                  <Link
                    isBlock
                    showAnchorIcon
                    href={property.docs}
                    color="primary"
                    className="text-3xl"
                  >
                    Redirect to docs
                  </Link>
                </TableCell>
              </TableRow>
              <TableRow key="4">
                <TableCell>
                  <p className="text-default-500 text-3xl">Symbol:</p>
                </TableCell>
                <TableCell>
                  <p className="text-white text-3xl"> {property.symbol}</p>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
        <Controller
          control={control}
          render={({ field: { onChange, value } }): JSX.Element => (
            <Input
              isRequired
              type="number"
              label="Price"
              placeholder="0.00"
              labelPlacement="outside"
              onChange={onChange}
              value={value}
              isInvalid={Boolean(errors.amount)}
              classNames={{
                label: 'text-2xl',
                input: 'text-2xl text-white/70',
                inputWrapper: 'h-12',
              }}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-2xl">ETH</span>
                </div>
              }
            />
          )}
          name="amount"
        />
      </CardBody>
      <CardFooter className="flex-row gap-10 pl-5 mb-5">
        <Button
          color="success"
          size="lg"
          isDisabled={!isValid}
          onPress={acceptProperty}
        >
          Accept
        </Button>
        <Button color="danger" size="lg" onPress={rejectProperty}>
          Reject
        </Button>
      </CardFooter>
    </Card>
  );
};

export default memo(CardApprove);
