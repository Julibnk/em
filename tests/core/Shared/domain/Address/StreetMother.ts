import { Street } from '../../../../../src/core/Shared/domain/Address/Street';
import { WordMother } from '../WordMother';

export class StreetMother {
  static create(value: string): Street {
    return new Street(value);
  }

  static random(): Street {
    return this.create(WordMother.address());
  }
}
