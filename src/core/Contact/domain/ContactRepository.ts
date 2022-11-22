import { AccountId } from '../../Account/domain/value-object/AccountId';
import { Nullable } from '../../Shared/domain/Nullable';
import { Phone } from '../../Shared/domain/Phone/Phone';
import { Contact } from './Contact';
import { ContactId } from './value-object/ContactId';

export interface ContactRepository {
  save(contact: Contact): Promise<void>;
  findById(accountId: AccountId, id: ContactId): Promise<Contact>;
  searchByPhone(accountId: AccountId, phone: Phone): Promise<Nullable<Contact>>;
}
