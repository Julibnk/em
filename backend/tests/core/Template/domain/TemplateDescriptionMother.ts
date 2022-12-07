import { WordMother } from '../../Shared/domain/WordMother';
import { TemplateDescription } from '../../../../src/core/Template/domain/value-object/TemplateDescription';

export class TemplateDescriptionMother {
  static create(value: string): TemplateDescription {
    return new TemplateDescription(value);
  }

  static random(): TemplateDescription {
    return this.create(WordMother.random());
  }
}
