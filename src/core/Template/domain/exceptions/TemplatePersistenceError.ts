import { Template } from '../Template';

export class TemplatePersistenceError extends Error {
  constructor(template: Template) {
    super(
      `Template ${template.id} for account ${template.accountId} could not be saved`
    );
  }
}
