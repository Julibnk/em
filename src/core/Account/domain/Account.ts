import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { AccountId } from './value-object/AccountId';
import { CompanyName } from './value-object/CompanyName';
import { Vat } from './value-object/Vat';
import { Street } from './value-object/Street';
import { AddressNumber } from './value-object/AddressNumber';
import { PostalCode } from './value-object/PostalCode';
import { Region } from './value-object/Region';
import { Country } from './value-object/Country';
import { Primitives } from '../../Shared/domain/Primitives';
import { Disabled } from '../../Shared/domain/value-object/Disabled';
import { MetaAccount, MetaAccountPrimitives } from './MetaAccount/MetaAccount';

export type AccountPrimitives = Primitives<Account> & {
  metaAccount: MetaAccountPrimitives;
};

export class Account extends AggregateRoot {
  constructor(
    readonly id: AccountId,
    readonly companyName: CompanyName,
    readonly vat: Vat,
    readonly street: Street,
    readonly addressNumber: AddressNumber,
    readonly postalCode: PostalCode,
    readonly region: Region,
    readonly country: Country,
    readonly disabled: Disabled,
    readonly metaAccount: MetaAccount
  ) {
    super();
  }

  static fromPrimitives(
    plainData: Omit<AccountPrimitives, 'region' | 'country'>
  ): Account {
    return new Account(
      new AccountId(plainData.id),
      new CompanyName(plainData.companyName),
      new Vat(plainData.vat),
      new Street(plainData.street),
      new AddressNumber(plainData.addressNumber),
      new PostalCode(plainData.postalCode),
      new Region(),
      new Country(),
      new Disabled(plainData.disabled),
      MetaAccount.fromPrimitives(plainData.metaAccount)
    );
  }

  toPrimitives(): AccountPrimitives {
    return {
      id: this.id.value,
      companyName: this.companyName.value,
      vat: this.vat.value,
      street: this.street.value,
      addressNumber: this.addressNumber.value,
      postalCode: this.postalCode.value,
      region: this.region.value,
      country: this.country.value,
      disabled: this.disabled.value,
      metaAccount: this.metaAccount.toPrimitives(),
    };
  }
}
