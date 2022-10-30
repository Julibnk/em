import { TemplateName } from '../../../../src/core/Template/domain/TemplateName';
import { WordMother } from '../../Shared/domain/WordMother';

export class TemplateNameMother {
  static create(value: string): TemplateName {
    return new TemplateName(value);
  }

  static random(): TemplateName {
    return this.create(WordMother.random());
  }
}
