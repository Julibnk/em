import { Uuid } from './value-object/Uuid';

export abstract class AggregateRoot {
  abstract id: Uuid;

  abstract toPrimitives(): any; //eslint-disable-line @typescript-eslint/no-explicit-any

  static sortById(a: AggregateRoot, b: AggregateRoot): number {
    return a.id.value.localeCompare(b.id.value);
  }
}
