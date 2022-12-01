import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { Primitives } from '../../../Shared/domain/Primitives';
import { MetaAccountId } from './value-object/MetaAccountId';

export type MetaAccountPrimitives = Primitives<MetaAccount>;
export class MetaAccount extends AggregateRoot {
  constructor(readonly id: MetaAccountId) {
    super();
  }

  static fromPrimitives(plainData: MetaAccountPrimitives): MetaAccount {
    return new MetaAccount(new MetaAccountId(plainData.id));
  }

  toPrimitives(): MetaAccountPrimitives {
    return {
      id: this.id.value,
    };
  }
}
