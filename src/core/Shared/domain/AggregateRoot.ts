import { Uuid } from './value-object/Uuid';

export abstract class AggregateRoot {
  abstract id: Uuid;

  abstract toPrimitives(): unknown;

  static sortById(a: AggregateRoot, b: AggregateRoot): number {
    return a.id.value.localeCompare(b.id.value);
  }
}
