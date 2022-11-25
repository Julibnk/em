// import { TemplateRepository } from '../domain/TemplateRepository';
// import { Template } from '../domain/Template';
// import { inject, injectable } from 'inversify';
// import { DiRepository } from '../../Shared/dependency-injection';
import { AccountRepository } from '../domain/AccountRepository';
// import { TemplateId } from '../domain/value-object/TemplateId';
// import { TemplateName } from '../domain/value-object/TemplateName';
// import { TemplateShortDescription } from '../domain/value-object/TemplateShortDescription';
// import { TemplateVariable } from '../domain/value-object/TemplateVariable';
// import { TemplatePreview } from '../domain/value-object/TemplatePreview';
// import { AccountId } from '../../Account/domain/value-object/AccountId';
// import { TemplateWithSameNameAlreadyExistsError } from '../domain/exceptions/TemplateWithSameNameAlreadyExistsError';

import { inject, injectable } from 'inversify';
import { DiRepository } from '../../Shared/dependency-injection';
import { AccountId } from '../domain/value-object/AccountId';
import { Account } from '../domain/Account';
import { MetaAccount } from '../domain/MetaAccount/MetaAccount';
import { MetaAccountId } from '../domain/MetaAccount/value-object/MetaAccountId';
import { CompanyName } from '../domain/value-object/CompanyName';
import { Street } from '../../Shared/domain/Address/Street';

export type Params = {
  id: string;
  companyName: string;
  street: string;
  addressNumber: string;
  postalCode: string;
  metaAccount: {
    id: string;
  };
};

@injectable()
export class SaveAccountUseCase {
  constructor(
    @inject(DiRepository.account)
    private repository: AccountRepository
  ) {}

  async run(params: Params): Promise<void> {
    const id = new AccountId(params.id);
    const companyName = new CompanyName();
    const street = new Street();
    const addressNumber = new CompanyName();
    const postalCode = new CompanyName();
    const metaAccount = new MetaAccount(
      new MetaAccountId(params.metaAccount.id)
    );
    // const id = new TemplateId(params.id);
    // const name = new TemplateName(params.name);
    // const shortDescription = new TemplateShortDescription(
    //   params.shortDescription
    // );
    // const preview = new TemplatePreview(params.preview);
    // const variable1 = new TemplateVariable(params.variable1);
    // const variable2 = new TemplateVariable(params.variable2);
    // const variable3 = new TemplateVariable(params.variable3);

    let account = await this.repository.findById(id);

    if (account) {
      account
        .change
        // shortDescription,
        // preview,
        // variable1,
        // variable2,
        // variable3
        ();
    } else {
      account = Account
        .create
        // accountId,
        // id,
        // name,
        // shortDescription,
        // preview,
        // variable1,
        // variable2,
        // variable3
        ();
    }

    this.repository.save(account);
  }
}
