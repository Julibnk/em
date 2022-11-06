import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export const DEFAULT_COUNTRY = 'ES';
export class Country extends StringValueObject {
  constructor() {
    super(DEFAULT_COUNTRY);
  }
}
