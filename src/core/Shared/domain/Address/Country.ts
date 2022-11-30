import { StringValueObject } from '../value-object/StringValueObject';

export const DEFAULT_COUNTRY = 'ES';
export class Country extends StringValueObject {
  constructor() {
    super(DEFAULT_COUNTRY);
  }
}
