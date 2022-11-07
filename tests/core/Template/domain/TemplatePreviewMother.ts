import { TemplatePreview } from '../../../../src/core/Template/domain/value-object/TemplatePreview';
import { WordMother } from '../../Shared/domain/WordMother';

export class TemplatePreviewMother {
  static create(value: string): TemplatePreview {
    return new TemplatePreview(value);
  }

  static random(): TemplatePreview {
    return this.create(WordMother.random());
  }
}
