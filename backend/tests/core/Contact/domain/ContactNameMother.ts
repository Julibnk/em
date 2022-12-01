import { WordMother } from '../../Shared/domain/WordMother';
import { ContactName } from '../../../../src/core/Contact/domain/value-object/ContactName';

export class ContactNameMother {
  static create(value: string): ContactName {
    return new ContactName(value);
  }

  static random(): ContactName {
    return this.create(WordMother.firstName());
  }
}
