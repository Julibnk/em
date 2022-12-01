// import { TemplateRepository } from '../domain/TemplateRepository';
// import { Template } from '../domain/Template';
// import { inject, injectable } from 'inversify';
// import { DiRepository } from '../../Shared/dependency-injection';
import { AccountPhoneRepository } from '../domain/AccountPhoneRepository';
// import { TemplateId } from '../domain/value-object/TemplateId';
// import { TemplateName } from '../domain/value-object/TemplateName';
// import { TemplateShortDescription } from '../domain/value-object/TemplateShortDescription';
// import { TemplateVariable } from '../domain/value-object/TemplateVariable';
// import { TemplatePreview } from '../domain/value-object/TemplatePreview';
// import { AccountId } from '../../Account/domain/value-object/AccountId';
import { AccountPhoneId } from '../domain/value-object/AccountPhoneId';
// import { TemplateWithSameNameAlreadyExistsError } from '../domain/exceptions/TemplateWithSameNameAlreadyExistsError';

import { inject, injectable } from 'inversify';
import { DiRepository } from '../../Shared/dependency-injection';
import { AccountId } from '../../Account/domain/value-object/AccountId';
import { Phone } from '../../Shared/domain/Phone/Phone';
import { AccountPhone } from '../domain/AccountPhone';
import { AccountPhoneAlreadyExistsError } from '../domain/exceptions/AccountPhoneAlreadyExistsError';

export type Params = {
  accountId: string;
  id: string;
  prefix: string;
  number: string;
};

@injectable()
export class SaveAccountPhoneUseCase {
  constructor(
    @inject(DiRepository.accountPhone)
    private repository: AccountPhoneRepository
  ) {}

  async run(params: Params): Promise<void> {
    const accountId = new AccountId(params.accountId);
    const id = new AccountPhoneId(params.id);
    const phone = Phone.fromPrimitives(params.prefix, params.number);

    let accountPhone = await this.repository.findById(accountId, id);

    if (accountPhone) {
      accountPhone.change(phone);
    } else {
      const sameAccountPhone = await this.repository.findByPhone(
        accountId,
        phone
      );

      if (sameAccountPhone) {
        throw new AccountPhoneAlreadyExistsError(sameAccountPhone.phone);
      }

      accountPhone = AccountPhone.create(accountId, id, phone);
    }

    this.repository.save(accountPhone);
  }
}
