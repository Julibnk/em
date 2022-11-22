import { StringValueObject } from '../value-object/StringValueObject';

export const DEFAULT_PREFIX = '+34';
export class PhonePrefix extends StringValueObject {
  constructor(value?: string) {
    super(value || DEFAULT_PREFIX);
  }
}
