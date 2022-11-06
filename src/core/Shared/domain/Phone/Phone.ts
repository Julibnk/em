import { AggregateRoot } from '../AggregateRoot';
import { PhoneId } from './value-object/PhoneId';
import { PhoneNumber } from './value-object/PhoneNumber';
import { PhonePrefix } from './value-object/PhonePrefix';

export class Phone extends AggregateRoot {
  constructor(
    readonly id: PhoneId,
    readonly prefix: PhonePrefix,
    readonly number: PhoneNumber
  ) {
    super();
  }

  toPrimitives() {
    throw new Error('Method not implemented.');
  }
}
