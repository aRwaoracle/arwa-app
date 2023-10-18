import { AddressType, BlockchainConstantsType } from '@/data/blockchain/types';

export const BlockchainConstants: BlockchainConstantsType = {
  goerli: {
    kyc: '0x3da1841dd7876f338dd8ef0fe75d9cc6fcc951cb' as AddressType,
    arwaManager: '0x9e9c2aC8Abcd77aFB89299a69f4e6aFF9F851296' as AddressType,
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
