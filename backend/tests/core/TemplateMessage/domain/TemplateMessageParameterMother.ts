import { TemplateMessageParameter } from '../../../../src/core/TemplateMessage/domain/value-object/TemplateMessageParameter';
import { MotherCreator } from '../../Shared/domain/MotherCreator';
export class TemplateMessageParameterMother {
  static create(value: string): TemplateMessageParameter {
    return new TemplateMessageParameter(value);
  }

  static random(): TemplateMessageParameter {
    return this.create(MotherCreator.random().lorem.word());
  }
}
