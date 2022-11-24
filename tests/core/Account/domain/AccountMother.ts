import { Account } from '../../../../src/core/Account/domain/Account';
import { CompanyName } from '../../../../src/core/Account/domain/value-object/CompanyName';
import { Vat } from '../../../../src/core/Account/domain/value-object/Vat';
import { Street } from '../../../../src/core/Account/domain/value-object/Street';
import { AddressNumber } from '../../../../src/core/Account/domain/value-object/AddressNumber';
import { PostalCode } from '../../../../src/core/Account/domain/value-object/PostalCode';
import { Region } from '../../../../src/core/Account/domain/value-object/Region';
import { Country } from '../../../../src/core/Account/domain/value-object/Country';
import { Disabled } from '../../../../src/core/Shared/domain/value-object/Disabled';
import { AccountId } from '../../../../src/core/Account/domain/value-object/AccountId';
import { AccountIdMother } from './AccountIdMother';
import { CompanyNameMother } from './CompanyNameMother';
import { VatMother } from './VatMother';
import { StreetMother } from './StreetMother';
import { PostalCodeMother } from './PostalCodeMother';
import { AddressNumberMother } from './AddressNumberMother';
import { MetaAccount } from '../../../../src/core/Account/domain/MetaAccount/MetaAccount';
import { MetaAccountMother } from './MetaAccount/MetaAccountMother';

export class AccountMother {
  static create(
    id: AccountId,
    companyName: CompanyName,
    vat: Vat,
    street: Street,
    addressNumber: AddressNumber,
    postalCode: PostalCode,
    region: Region,
    country: Country,
    disabled: Disabled,
    metaAccount: MetaAccount
  ): Account {
    return new Account(
      id,
      companyName,
      vat,
      street,
      addressNumber,
      postalCode,
      region,
      country,
      disabled,
      metaAccount
    );
  }
  static random(): Account {
    return this.create(
      AccountIdMother.random(),
      CompanyNameMother.random(),
      VatMother.random(),
      StreetMother.random(),
      AddressNumberMother.random(),
      PostalCodeMother.random(),
      new Region(),
      new Country(),
      new Disabled(),
      MetaAccountMother.random()
    );
  }
}
