import { PostalCode } from '../../../../src/core/Account/domain/value-object/PostalCode';
import { MotherCreator } from '../../Shared/domain/MotherCreator';
import { WordMother } from '../../Shared/domain/WordMother';

export class PostalCodeMother {
  static create(value: string): PostalCode {
    return new PostalCode(value);
  }

  static random(): PostalCode {
    return this.create(WordMother.zipCode());
  }
}
