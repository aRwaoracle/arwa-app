import { PropertyStatus } from '@/data';

export type AddressType = `0x${string}`;

export type BlockchainConstantsType = {
  goerli: {
    kyc: AddressType;
    arwaManager: AddressType;
  };
  mantleTeestnet: {
    kyc: AddressType;
    arwaManager: AddressType;
  };
  scrollSepolia: {
    kyc: AddressType;
    arwaManager: AddressType;
  };
  polygonzkEvmTestnet: {
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
