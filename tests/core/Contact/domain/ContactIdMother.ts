import { UuidMother } from '../../Shared/domain/UuidMother';
import { ContactId } from '../../../../src/core/Contact/domain/value-object/ContactId';

export class ContactIdMother {
  static create(value: string): ContactId {
    return new ContactId(value);
  }

  static random(): ContactId {
    return this.create(UuidMother.random());
  }
}
