import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { AccountId } from './AccountId';
import { CompanyName } from './CompanyName';
import { Vat } from './Vat';
import { Street } from './Street';
import { AddressNumber } from './AddressNumber';
import { PostalCode } from './PostalCode';
import { Region } from './Region';
import { Country } from './Country';
import { PhoneNumber } from '../../Shared/domain/common/PhoneNumber';
import { NumberValueObject } from '../../Shared/domain/value-object/NumberValueObject';

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
    readonly phoneNumber: PhoneNumber
  ) {
    super();
  }

  static fromPrimitives(plainData: {
    id: string;
    companyName: string;
    vat: string;
    street: string;
    addressNumber: string;
    postalCode: string;
    region: string;
    country: string;
    phoneNumber: string;
  }): Account {
    return new Account(
      new AccountId(plainData.id),
      new CompanyName(plainData.companyName),
      new Vat(plainData.vat),
      new Street(plainData.street),
      new AddressNumber(plainData.addressNumber),
      new PostalCode(plainData.postalCode),
      new Region(plainData.region),
      new Country(plainData.country),
      new PhoneNumber(plainData.phoneNumber)
    );
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      companyName: this.companyName.value,
      vat: this.vat.value,
      street: this.street.value,
      addressNumber: this.addressNumber.value,
      postalCode: this.postalCode.value,
      region: this.region.value,
      country: this.country.value,
      phoneNumber: this.phoneNumber.value,
    };
  }
}
