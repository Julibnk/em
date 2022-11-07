import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { MessageId } from './value-object/MessageId';

export class Message extends AggregateRoot {
  constructor(readonly id: MessageId) {
    super();
  }

  toPrimitives() {
    throw new Error('Method not implemented.');
  }
}
