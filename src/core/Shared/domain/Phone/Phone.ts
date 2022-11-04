import { AggregateRoot } from '../AggregateRoot';

export class Phone extends AggregateRoot {
  toPrimitives() {
    throw new Error('Method not implemented.');
  }
  constructor() {
    super();
  }
}
