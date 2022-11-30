import { Phone } from '../../../../../src/core/Shared/domain/Phone/Phone';
import { PhoneNumber } from '../../../../../src/core/Shared/domain/Phone/PhoneNumber';
import { PhonePrefix } from '../../../../../src/core/Shared/domain/Phone/PhonePrefix';
import { PhoneNumberMother } from './PhoneNumberMother';
import { PhonePrefixMother } from './PhonePrefixMother';

export class PhoneMother {
  static create(prefix: PhonePrefix, number: PhoneNumber): Phone {
    return new Phone(prefix, number);
  }

  static random(): Phone {
    return this.create(PhonePrefixMother.random(), PhoneNumberMother.random());
  }
}
