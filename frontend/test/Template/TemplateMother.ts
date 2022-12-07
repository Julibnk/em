import { Template } from '../../src/Template/Template';
import { UuidMother } from '../Shared/UuidMother';
import { WordMother } from '../Shared/WordMother';

export class TemplateMother {
  static create(params: Partial<Template>): Template {
    const template: Template = {
      id: UuidMother.random(),
      name: WordMother.random(),
      description: WordMother.random(),
      preview: WordMother.random(),
      variable1: WordMother.random(),
      variable2: WordMother.random(),
      variable3: WordMother.random(),
      ...params,
    };
    return template;
  }
}
