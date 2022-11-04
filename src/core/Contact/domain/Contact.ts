import { AggregateRoot } from '../../Shared/domain/AggregateRoot';

export class Contact extends AggregateRoot {
  constructor() {
    super();
  }

  toPrimitives() {
    throw new Error('Method not implemented.');
  }
}
