import { WordMother } from '../../Shared/domain/WordMother';
import { TemplateVariable } from '../../../../src/core/Template/domain/value-object/TemplateVariable';

export class TemplateVariableMother {
  static create(value: string): TemplateVariable {
    return new TemplateVariable(value);
  }

  static random(): TemplateVariable {
    return this.create(WordMother.random());
  }
}
