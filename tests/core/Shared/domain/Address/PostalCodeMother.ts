import { PostalCode } from '../../../../../src/core/Shared/domain/Address/PostalCode';
import { WordMother } from '../WordMother';

export class PostalCodeMother {
  static create(value: string): PostalCode {
    return new PostalCode(value);
  }

  static random(): PostalCode {
    return this.create(WordMother.zipCode());
  }
}
