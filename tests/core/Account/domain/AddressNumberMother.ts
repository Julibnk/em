import { AddressNumber } from '../../../../src/core/Account/domain/value-object/AddressNumber';
import { WordMother } from '../../Shared/domain/WordMother';

export class AddressNumberMother {
  static create(value: string): AddressNumber {
    return new AddressNumber(value);
  }

  static random(): AddressNumber {
    return this.create(WordMother.buildingNumber());
  }
}
