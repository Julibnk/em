import { PhoneNumber } from '../../../../../src/core/Shared/domain/Phone/PhoneNumber';
import { MotherCreator } from '../MotherCreator';
export class PhoneNumberMother {
  static create(value: string): PhoneNumber {
    return new PhoneNumber(value);
  }

  static random(): PhoneNumber {
    return this.create(MotherCreator.random().phone.number());
  }
}
