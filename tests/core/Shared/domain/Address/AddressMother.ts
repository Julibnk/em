import { Address } from '../../../../../src/core/Shared/domain/Address/Address';
import { AddressNumber } from '../../../../../src/core/Shared/domain/Address/AddressNumber';
import { Country } from '../../../../../src/core/Shared/domain/Address/Country';
import { PostalCode } from '../../../../../src/core/Shared/domain/Address/PostalCode';
import { Region } from '../../../../../src/core/Shared/domain/Address/Region';
import { Street } from '../../../../../src/core/Shared/domain/Address/Street';
import { StreetMother } from './StreetMother';
import { AddressNumberMother } from './AddressNumberMother';
import { PostalCodeMother } from './PostalCodeMother';

export class AddressMother {
  static create(
    street: Street,
    addressNumber: AddressNumber,
    postalCode: PostalCode,
    region: Region,
    country: Country
  ): Address {
    return new Address(street, addressNumber, postalCode, region, country);
  }

  static random(): Address {
    return this.create(
      StreetMother.random(),
      AddressNumberMother.random(),
      PostalCodeMother.random(),
      new Region(),
      new Country()
    );
  }
}
