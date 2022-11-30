import { AccountRepository } from '../domain/AccountRepository';
import { inject, injectable } from 'inversify';
import { DiRepository } from '../../Shared/dependency-injection';
import { AccountId } from '../domain/value-object/AccountId';
import { Account } from '../domain/Account';
import { MetaAccount } from '../domain/MetaAccount/MetaAccount';
import { CompanyName } from '../domain/value-object/CompanyName';
import { Address } from '../../Shared/domain/Address/Address';
import { Vat } from '../domain/value-object/Vat';

export type Params = {
  id: string;
  companyName: string;
  vat: string;
  address: {
    street: string;
    addressNumber: string;
    postalCode: string;
  };
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
    const companyName = new CompanyName(params.companyName);
    const vat = new Vat(params.vat);
    const address = Address.fromPrimitives(params.address);
    const metaAccount = MetaAccount.fromPrimitives(params.metaAccount);

    let account = await this.repository.findById(id);

    if (account) {
      account.change(companyName, address, metaAccount);
    } else {
      account = Account.create(id, companyName, vat, address, metaAccount);
    }

    this.repository.save(account);
  }
}
