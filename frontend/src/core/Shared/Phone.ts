import { Properties } from './Primitives';

export class Phone {
  static DEFAULT_PREFIX = '+34';

  private constructor(public prefix: string, public number: string) {}

  static create(prefix: string, number: string) {
    return new Phone(prefix, number);
  }

  static createEmpty() {
    return new Phone(Phone.DEFAULT_PREFIX, '');
  }

  static fromPrimitives(plainData: Properties<Phone>): Phone {
    return new Phone(plainData.prefix, plainData.number);
  }
}
