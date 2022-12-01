import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class ContactLastName extends StringValueObject {
  constructor(value?: string) {
    super(value || '');
  }
}
