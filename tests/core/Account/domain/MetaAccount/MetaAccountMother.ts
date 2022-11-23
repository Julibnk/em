import { MetaAccountId } from '../../../../../src/core/Account/domain/MetaAccount/value-object/MetaAccountId';
import { MetaAccount } from '../../../../../src/core/Account/domain/MetaAccount/MetaAccount';
import { MetaAccountIdMother } from './MetaAccountIdMother';

export class MetaAccountMother {
  static create(id: MetaAccountId): MetaAccount {
    return new MetaAccount(id);
  }
  static random(): MetaAccount {
    return this.create(MetaAccountIdMother.random());
  }
}
