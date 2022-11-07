import { StringValueObject } from './StringValueObject';

export class PhonePrefix extends StringValueObject {
  constructor(value?: string) {
    const DEFAULT_PREFIX = '34';
    super(value || DEFAULT_PREFIX);
  }
}
