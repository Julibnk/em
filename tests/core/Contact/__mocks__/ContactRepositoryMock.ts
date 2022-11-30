import { AccountId } from '../../../../src/core/Account/domain/value-object/AccountId';
import { Contact } from '../../../../src/core/Contact/domain/Contact';
import { ContactRepository } from '../../../../src/core/Contact/domain/ContactRepository';
import { ContactId } from '../../../../src/core/Contact/domain/value-object/ContactId';
import { Nullable } from '../../../../src/core/Shared/domain/Nullable';
import { Phone } from '../../../../src/core/Shared/domain/Phone/Phone';

export class ContactRepositoryMock implements ContactRepository {
  mockFindByPhone = jest.fn();
  mockFindById = jest.fn();
  mockSave = jest.fn();
  mockSearchAll = jest.fn();

  private allContacts: Array<Contact> = [];
  private contactByPhone: Nullable<Contact> = null;
  private contactById: Nullable<Contact> = null;

  returnFindByPhone(contact: Contact): void {
    this.contactByPhone = contact;
  }

  returnSearchAll(contacts: Array<Contact>): void {
    this.allContacts = contacts;
  }

  returnFindById(contact: Contact): void {
    this.contactById = contact;
  }

  async findByPhone(
    accountId: AccountId,
    phone: Phone
  ): Promise<Nullable<Contact>> {
    this.mockFindByPhone(accountId, phone);
    return this.contactByPhone;
  }

  async findById(
    accountId: AccountId,
    id: ContactId
  ): Promise<Nullable<Contact>> {
    this.mockFindById(accountId, id);

    return this.contactById;
  }

  async save(contact: Contact): Promise<void> {
    this.mockSave(contact);
  }

  async searchAll(accountId: AccountId): Promise<Array<Contact>> {
    this.mockSearchAll(accountId);
    return this.allContacts;
  }
}
