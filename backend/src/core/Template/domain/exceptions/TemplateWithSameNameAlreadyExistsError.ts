import { TemplateName } from '../value-object/TemplateName';
import { DomainError } from '../../../Shared/domain/DomainError';

export class TemplateWithSameNameAlreadyExistsError extends DomainError {
  constructor(name: TemplateName) {
    super(`Template with name ${name.value} already exists`);
  }
}
