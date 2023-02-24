import { Address } from '../Shared/Address';
import { MetaAccount } from './MetaAccount';

export interface Account {
  id: string;
  companyName: string;
  vat: string;
  disabled: boolean;
  address: Address;
  metaAccount: MetaAccount;
}

export const initialAccount: Account = {
  id: '',
  companyName: '',
  vat: '',
  disabled: false,
  address: {
    street: '',
    addressNumber: '',
    postalCode: '',
    region: '',
    country: '',
  },
  metaAccount: {
    id: '',
  },
};
