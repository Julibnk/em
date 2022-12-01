import {
  DEFAULT_PREFIX,
  PhonePrefix,
} from '../../../../../src/core/Shared/domain/Phone/PhonePrefix';

export class PhonePrefixMother {
  static create(value: string): PhonePrefix {
    return new PhonePrefix(value);
  }

  static random(): PhonePrefix {
    return this.create(DEFAULT_PREFIX);
  }
}
