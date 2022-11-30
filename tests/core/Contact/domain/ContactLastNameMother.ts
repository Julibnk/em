import { WordMother } from '../../Shared/domain/WordMother';
import { ContactLastName } from '../../../../src/core/Contact/domain/value-object/ContactLastName';

export class ContactLastNameMother {
  static create(value: string): ContactLastName {
    return new ContactLastName(value);
  }

  static random(): ContactLastName {
    return this.create(WordMother.lastName());
  }
}
