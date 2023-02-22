import { Contact } from './Contact';

export interface ContactRepository {
  searchAll(): Promise<Contact[]>;
  searchById(contactId: string): Promise<Contact>;
  save(contact: Contact): Promise<void>;
}
