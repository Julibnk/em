import { BoolValueObject } from './BoolValueObject';

export class Disabled extends BoolValueObject {
  constructor(value?: boolean) {
    super(value || false);
  }
}
