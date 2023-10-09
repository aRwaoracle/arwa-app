import { useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';

import { BlockchainConstants, KycManagerAbi } from '@/data';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useKycManager = () => {
  const { address } = useAccount();
  const [globalLoading, setGlobalLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { data, isLoading, isError, refetch, isRefetching } = useContractRead({
    address: BlockchainConstants.goerli.kyc,
    abi: KycManagerAbi,
    args: [address],
    functionName: 'addressToKycState',
  });

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const updateKyc = async () => {
    setGlobalLoading(true);
    try {
      await fetch('/api/kyc-manager', {
        method: 'post',
        body: JSON.stringify({
          address,
        }),
      });
    } catch (error) {
      console.log('Error', error);
      setGlobalLoading(false);
      return;
    }

    const timeout = await setInterval(async () => {
      const referenceData = await refetch();
      if (referenceData.data) {
        clearInterval(timeout);
        setGlobalLoading(false);
      }
    }, 300);
  };

  return {
    isKycPassed: data,
    isLoading: isLoading || isRefetching || globalLoading,
    isError,
    updateKyc,
  };
};