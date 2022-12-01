import { WordMother } from '../../Shared/domain/WordMother';
import { TemplateShortDescription } from '../../../../src/core/Template/domain/value-object/TemplateShortDescription';

export class TemplateShortDescriptionMother {
  static create(value: string): TemplateShortDescription {
    return new TemplateShortDescription(value);
  }

  static random(): TemplateShortDescription {
    return this.create(WordMother.random());
  }
}
