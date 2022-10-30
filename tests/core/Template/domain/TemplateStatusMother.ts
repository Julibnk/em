import {
  TemplateStatuses,
  TemplateStatus,
} from '../../../../src/core/Template/domain/TemplateStatus';
import { EnumMother } from '../../Shared/domain/EnumMother';

export class TemplateStatusMother {
  static create(value: TemplateStatuses): TemplateStatus {
    return new TemplateStatus(value);
  }

  static random(): TemplateStatus {
    return this.create(
      EnumMother.create<TemplateStatuses>(Object.values(TemplateStatuses))
    );
  }
}
