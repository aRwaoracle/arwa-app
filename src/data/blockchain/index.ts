import { AddressType, BlockchainConstantsType } from '@/data/blockchain/types';

export const BlockchainConstants: BlockchainConstantsType = {
  goerli: {
    kyc: process.env.NEXT_PUBLIC_GOERLI_KYC_MANAGER_ADDRESS as AddressType,
    arwaManager: process.env.NEXT_PUBLIC_ARWA_MANAGER_ADDRESS as AddressType,
  },
};

export enum PropertyStatus {
  Pending,
  Shipped,
  Accepted,
  Rejected,
  Canceled,
}
