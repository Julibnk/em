import { AggregateRoot } from '../AggregateRoot';
import { PhoneId } from './value-object/PhoneId';
import { PhoneNumber } from './value-object/PhoneNumber';
import { PhonePrefix } from './value-object/PhonePrefix';
import { Primitives } from '../Primitives';

export class Phone extends AggregateRoot {
  constructor(
    readonly id: PhoneId,
    readonly number: PhoneNumber,
    readonly prefix: PhonePrefix
  ) {
    super();
  }

  toPrimitives(): Primitives<Phone> {
    return {
      id: this.id.value,
      number: this.number.value,
      prefix: this.prefix.value,
    };
  }

  static fromPrimitives(plainData: Primitives<Phone>): Phone {
    return new Phone(
      new PhoneId(plainData.id),
      new PhoneNumber(plainData.number),
      new PhonePrefix(plainData.prefix)
    );
  }
}
