import { useMemo } from 'react';
import { useAccount, useContractRead } from 'wagmi';

import { BlockchainConstants, PropertyType } from '@/data';
import { ArwaManagerAbi } from '@/data/abi/arwa-manager.abi';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useArwaUser = () => {
  const { address } = useAccount();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const { data: isVerifier } = useContractRead({
    abi: ArwaManagerAbi,
    address: BlockchainConstants.goerli.arwaManager,
    functionName: 'verifier',
    args: [address],
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const { data: userProperties } = useContractRead({
    abi: ArwaManagerAbi,
    address: BlockchainConstants.goerli.arwaManager,
    functionName: 'userProperties',
    args: [address],
  });

  return useMemo(
    () => ({
      isVerifier,
      userProperties: userProperties as PropertyType[],
    }),
    [userProperties, isVerifier],
  );
};