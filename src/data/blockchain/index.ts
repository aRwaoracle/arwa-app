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

export const StatusToText: Record<PropertyStatus, string> = {
  [PropertyStatus.Pending]: 'Pending for approve',
  [PropertyStatus.Shipped]: 'Shipped',
  [PropertyStatus.Accepted]: 'Accepted accepted!',
  [PropertyStatus.Rejected]: 'Rejected property',
  [PropertyStatus.Canceled]: 'Canceled property',
};

export const AddressZero = '0x0000000000000000000000000000000000000000';
