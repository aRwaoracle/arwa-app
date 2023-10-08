import { AddressType, BlockchainConstantsType } from '@/data/blockchain/types';

export const BlockchainConstants: BlockchainConstantsType = {
  goerli: {
    kyc: process.env.NEXT_PUBLIC_GOERLI_KYC_MANAGER_ADDRESS as AddressType,
  },
};
