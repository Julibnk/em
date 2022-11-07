import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class CategoryShortDescription extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureLengthIsLessThan40Characters(value);
  }

  private ensureLengthIsLessThan40Characters(value: string): void {
    if (value.length > 40) {
      throw new InvalidArgumentError(
        `The Course Short Description <${value}> has more than 40 characters`
      );
    }
  }
}
