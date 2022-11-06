import { TemplateName } from '../../../../src/core/Template/domain/value-object/TemplateName';
import { WordMother } from '../../Shared/domain/WordMother';

export class TemplateNameMother {
  static create(value: string): TemplateName {
    return new TemplateName(value);
  }

  static random(): TemplateName {
    return this.create(WordMother.random());
  }
}
