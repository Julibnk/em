import { AggregateRoot } from '../../Shared/domain/AggregateRoot';

export class Message extends AggregateRoot {
  constructor() {
    super();
  }

  toPrimitives() {
    throw new Error('Method not implemented.');
  }
}
