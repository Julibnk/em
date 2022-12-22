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
