import { PropertyStatus } from '@/data';

export type AddressType = `0x${string}`;

export type BlockchainConstantsType = {
  5: {
    kyc: AddressType;
    arwaManager: AddressType;
  };
  5001: {
    kyc: AddressType;
    arwaManager: AddressType;
  };
  '534351': {
    kyc: AddressType;
    arwaManager: AddressType;
  };
  1442: {
    kyc: AddressType;
    arwaManager: AddressType;
  };
};

export type PropertyType = {
  id: number;
  name: string;
  docs: string;
  symbol: string;
  owner: AddressType;
  status: PropertyStatus;
  collectionAddress: AddressType;
  verifier: AddressType;
};
