import { inject, injectable } from 'inversify';
import { AccountId } from '../../Account/domain/value-object/AccountId';
import { DiRepository } from '../../Shared/dependency-injection';
import { Contact } from '../domain/Contact';
// import { Category } from '../domain/Category';
// import { CategoryRepository } from '../domain/CategoryRepository';
import { ContactRepository } from '../domain/ContactRepository';

@injectable()
export class SearchAllContactsUseCase {
  constructor(
    @inject(DiRepository.contact)
    private repository: ContactRepository
  ) {}

  run(accountId: string): Promise<Array<Contact>> {
    return this.repository.searchAll(new AccountId(accountId));
  }
}
