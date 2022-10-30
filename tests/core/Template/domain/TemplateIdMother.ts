import { UuidMother } from '../../Shared/domain/UuidMother';
import { TemplateId } from '../../../../src/core/Template/domain/TemplateId';

export class TemplateIdMother {
  static create(value: string): TemplateId {
    return new TemplateId(value);
  }

  static random(): TemplateId {
    return this.create(UuidMother.random());
  }
}
