import { AddressNumber } from '../../../../../src/core/Shared/domain/Address/AddressNumber';
import { WordMother } from '../WordMother';

export class AddressNumberMother {
  static create(value: string): AddressNumber {
    return new AddressNumber(value);
  }

  static random(): AddressNumber {
    return this.create(WordMother.buildingNumber());
  }
}
