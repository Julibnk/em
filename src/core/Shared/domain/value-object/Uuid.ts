import { ValueObject } from './ValueObject';
import { v4 as uuid, validate } from 'uuid';
import { InvalidArgumentError } from './InvalidArgumentError';

export class Uuid extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureIsValidUuid(value);
  }

  static random(): Uuid {
    return new Uuid(uuid());
  }

  private ensureIsValidUuid(id: string): void {
    if (!validate(id)) {
      throw new InvalidArgumentError(
        `Value ${id} isn´t valid for ${this.constructor.name}`
      );
    }
  }

  toString(): string {
    return this.value;
  }
}
