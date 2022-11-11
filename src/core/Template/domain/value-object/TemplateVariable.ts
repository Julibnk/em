import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

// export class
export class TemplateVariable extends StringValueObject {
  constructor(value: string) {
    const parsedValue = value.toUpperCase().replaceAll(' ', '_');
    super(parsedValue);
  }
}
