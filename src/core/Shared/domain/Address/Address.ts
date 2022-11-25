import { AddressNumber } from './AddressNumber';
import { Country } from './Country';
import { PostalCode } from './PostalCode';
import { Region } from './Region';
import { Street } from './Street';
import { Primitives } from '../Primitives';

export class Address {
  constructor(
    private _street: Street,
    private _addressNumber: AddressNumber,
    private _postalCode: PostalCode,
    private _region: Region,
    private _country: Country
  ) {}

  get street(): Street {
    return this._street;
  }
  get addressNumber(): AddressNumber {
    return this._addressNumber;
  }
  get postalCode(): PostalCode {
    return this._postalCode;
  }
  get region(): Region {
    return this._region;
  }
  get country(): Country {
    return this._country;
  }

  static fromPrimitives(
    plainData: Primitives<Omit<Address, 'region' | 'country'>>
  ): Address {
    return new Address(
      new Street(plainData.street),
      new AddressNumber(plainData.addressNumber),
      new PostalCode(plainData.postalCode),
      new Region(),
      new Country()
    );
  }

  toPrimitives(): Primitives<Address> {
    return {
      street: this._street.value,
      addressNumber: this._addressNumber.value,
      postalCode: this._postalCode.value,
      region: this._region.value,
      country: this._country.value,
    };
  }
}
