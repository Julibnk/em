import { Account } from '../../../../src/core/Account/domain/Account';
import { CompanyName } from '../../../../src/core/Account/domain/value-object/CompanyName';
import { Vat } from '../../../../src/core/Account/domain/value-object/Vat';
import { Disabled } from '../../../../src/core/Shared/domain/value-object/Disabled';
import { AccountId } from '../../../../src/core/Account/domain/value-object/AccountId';
import { AccountIdMother } from './AccountIdMother';
import { CompanyNameMother } from './CompanyNameMother';
import { VatMother } from './VatMother';
import { MetaAccount } from '../../../../src/core/Account/domain/MetaAccount/MetaAccount';
import { MetaAccountMother } from './MetaAccount/MetaAccountMother';
import { Address } from '../../../../src/core/Shared/domain/Address/Address';
import { AddressMother } from '../../Shared/domain/Address/AddressMother';

export class AccountMother {
  static create(
    id: AccountId,
    companyName: CompanyName,
    vat: Vat,
    disabled: Disabled,
    address: Address,
    metaAccount: MetaAccount
  ): Account {
    return new Account(id, companyName, vat, disabled, address, metaAccount);
  }
  static withMetaAccount(metaAccount: MetaAccount): Account {
    return this.create(
      AccountIdMother.random(),
      CompanyNameMother.random(),
      VatMother.random(),
      new Disabled(),
      AddressMother.random(),
      metaAccount
    );
  }

  static makeCopy(account: Account): Account {
    return new Account(
      account.id,
      account.companyName,
      account.vat,
      account.disabled,
      account.address,
      account.metaAccount
    );
  }

  static random(): Account {
    return this.create(
      AccountIdMother.random(),
      CompanyNameMother.random(),
      VatMother.random(),
      new Disabled(),
      AddressMother.random(),
      MetaAccountMother.random()
    );
  }
}
