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
    readonly disabled: Disabled
  ) {
    super();
  }

  static fromPrimitives(plainData: Primitives<Account>): Account {
    return new Account(
      new AccountId(plainData.id),
      new CompanyName(plainData.companyName),
      new Vat(plainData.vat),
      new Street(plainData.street),
      new AddressNumber(plainData.addressNumber),
      new PostalCode(plainData.postalCode),
      new Region(plainData.region),
      new Country(plainData.country),
      new Disabled(plainData.disabled)
    );
  }

  toPrimitives(): Primitives<Account> {
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
    };
  }
}
