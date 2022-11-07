import { CompanyName } from '../../../../src/core/Account/domain/value-object/CompanyName';
import { WordMother } from '../../Shared/domain/WordMother';
export class CompanyNameMother {
  static create(value: string): CompanyName {
    return new CompanyName(value);
  }

  static random(): CompanyName {
    return this.create(WordMother.random());
  }
}
