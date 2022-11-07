import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export const DEFAULT_REGION = '01';
export class Region extends StringValueObject {
  constructor() {
    super(DEFAULT_REGION);
  }
}
