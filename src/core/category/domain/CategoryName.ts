import { InvalidArgumentError } from '../../shared/domain/value-object/InvalidArgumentError';
import { StringValueObject } from '../../shared/domain/value-object/StringValueObject';

export class CategoryName extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureLengthIsLessThan20Characters(value);
  }

  private ensureLengthIsLessThan20Characters(value: string): void {
    if (value.length > 20) {
      throw new InvalidArgumentError(
        `The Category Name <${value}> has more than 20 characters`
      );
    }
  }
}
