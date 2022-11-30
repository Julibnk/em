import { StringValueObject } from '../value-object/StringValueObject';

export const DEFAULT_REGION = '01';
export class Region extends StringValueObject {
  constructor() {
    super(DEFAULT_REGION);
  }
}
