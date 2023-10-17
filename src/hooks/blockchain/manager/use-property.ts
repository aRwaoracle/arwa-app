import { useCallback, useMemo } from 'react';
import { readContract, writeContract } from '@wagmi/core';
import { useAccount } from 'wagmi';

import { BlockchainConstants, PropertyType } from '@/data';
import { ArwaManagerAbi } from '@/data/abi/arwa-manager.abi';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useProperty = () => {
  const account = useAccount();

  const createProperty = useCallback(
    // eslint-disable-next-line unicorn/prevent-abbreviations
    async (name: string, docs: string, symbol: string) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const { hash } = await writeContract({
        address: BlockchainConstants.goerli.arwaManager,
        abi: ArwaManagerAbi,
        functionName: 'createPropertyRequest',
        account: account.address,
        args: [name, docs, symbol],
      });
      return hash;
    },
    [account],
  );

  const getPropertyInfo = useCallback(
    async (id: number) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const data = await readContract({
        address: BlockchainConstants.goerli.arwaManager,
        abi: ArwaManagerAbi,
        functionName: 'getPropertyById',
        account: account.address,
        args: [id],
      });
      return data as PropertyType;
    },
    [account],
  );

  return useMemo(() => ({ createProperty, getPropertyInfo }), [account]);
};
