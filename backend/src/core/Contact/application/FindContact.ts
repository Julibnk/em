import { inject, injectable } from 'inversify';
import { AccountId } from '../../Account/domain/value-object/AccountId';
import { DiRepository } from '../../Shared/dependency-injection';
import { Contact } from '../domain/Contact';
import { ContactRepository } from '../domain/ContactRepository';
import { ContactNotFoundError } from '../domain/exceptions/ContactNotFoundError';
import { ContactId } from '../domain/value-object/ContactId';

@injectable()
export class FindContactUseCase {
  constructor(
    @inject(DiRepository.contact)
    private readonly repository: ContactRepository
  ) {}

  async run(accountId: string, id: string): Promise<Contact> {
    const contact = await this.repository.findById(
      new AccountId(accountId),
      new ContactId(id)
    );

    if (!contact) {
      throw new ContactNotFoundError(new ContactId(id));
    }

    return contact;
  }
}
