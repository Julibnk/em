import { WordMother } from '../../Shared/domain/WordMother';
import { TemplateVariable } from '../../../../src/core/Template/domain/TemplateVariable';

export class TemplateVariableMother {
  static create(value: string): TemplateVariable {
    return new TemplateVariable(value);
  }

  static random(): TemplateVariable {
    return this.create(WordMother.random());
  }
}
