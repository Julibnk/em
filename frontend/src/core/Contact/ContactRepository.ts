import { Contact } from './Contact';

export interface ContactRepository {
  searchAll(): Promise<Contact[]>;
  save(contact: Contact): Promise<void>;
}
