import { Street } from '../../../../src/core/Account/domain/value-object/Street';
import { MotherCreator } from '../../Shared/domain/MotherCreator';
import { WordMother } from '../../Shared/domain/WordMother';

export class StreetMother {
  static create(value: string): Street {
    return new Street(value);
  }

  static random(): Street {
    return this.create(WordMother.address());
  }
}
