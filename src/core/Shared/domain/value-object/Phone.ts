import { Primitives } from '../Primitives';
import { PhoneNumber } from './PhoneNumber';
import { PhonePrefix } from './PhonePrefix';

export class Phone {
  constructor(readonly prefix: PhonePrefix, readonly number: PhoneNumber) {
    this.prefix = prefix;
    this.number = number;
  }

  static fromPrimitives(prefix: string, number: string): Phone {
    return new Phone(new PhonePrefix(prefix), new PhoneNumber(number));
  }

  value(): string {
    return `${this.prefix.value}${this.number.value}`;
  }

  toPrimitives(): Primitives<Phone> {
    return {
      prefix: this.prefix.value,
      number: this.number.value,
    };
  }
}
