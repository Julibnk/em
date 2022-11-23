import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { Primitives } from '../../../Shared/domain/Primitives';
import { MetaAccountId } from './value-object/MetaAccountId';

export class MetaAccount extends AggregateRoot {
  constructor(readonly id: MetaAccountId) {
    super();
  }

  static fromPrimitives(plainData: Primitives<MetaAccount>): MetaAccount {
    return new MetaAccount(new MetaAccountId(plainData.id));
  }

  toPrimitives(): Primitives<MetaAccount> {
    return {
      id: this.id.value,
    };
  }
}
