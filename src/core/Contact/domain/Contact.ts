import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { PhoneNumber } from '../../Shared/domain/value-object/PhoneNumber';
import { PhonePrefix } from '../../Shared/domain/value-object/PhonePrefix';
import { ContactId } from './value-object/ContactId';

export class Contact extends AggregateRoot {
  constructor(
    readonly id: ContactId,
    readonly number: PhoneNumber,
    readonly prefix: PhonePrefix
  ) {
    super();
  }

  toPrimitives() {
    throw new Error('Method not implemented.');
  }
}
