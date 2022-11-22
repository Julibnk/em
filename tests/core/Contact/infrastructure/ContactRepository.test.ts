import { ContactRepository } from '../../../../src/core/Contact/domain/ContactRepository';
import {
  container,
  DIDomain,
} from '../../../../src/core/Shared/dependency-injection';
import { TestEnvironmentManager } from '../../Shared/infrastructure/TestEnvironmentManager';
import { ContactMother } from '../domain/ContactMother';
import { Account } from '../../../../src/core/Account/domain/Account';
import { AccountIdMother } from '../../Account/domain/AccountIdMother';
import { ContactPersistenceError } from '../../../../src/core/Contact/domain/exceptions/ContactPersistenceError';
import { ContactIdMother } from '../domain/ContactIdMother';
import { PhoneMother } from '../../Shared/domain/Phone/PhoneMother';
import { Contact } from '../../../../src/core/Contact/domain/Contact';

let account: Account;

const enviromentManager = container.get<TestEnvironmentManager>(
  DIDomain.environmentManager
);
const repository = container.get<ContactRepository>(DIDomain.contact);

describe('ContactRepository', () => {
  beforeEach(async () => {
    await enviromentManager.truncate();
    account = await enviromentManager.createAccount();
  });

  afterAll(async () => {
    await enviromentManager.truncate();
  });

  describe('#save', () => {
    it('Should save a contact', async () => {
      const contact = ContactMother.withAccount(account.id);
      await repository.save(contact);
    });

    it('Can´t save a contact with inexistent account', async () => {
      const contact = ContactMother.withAccount(AccountIdMother.random());
      expect(async () => await repository.save(contact)).rejects.toThrow(
        ContactPersistenceError
      );
    });
  });

  describe('#searchAll', () => {
    it('Should return all contacts', async () => {
      const contacts = [
        ContactMother.withAccount(account.id),
        ContactMother.withAccount(account.id),
        ContactMother.withAccount(account.id),
      ];

      for (const contact of contacts) {
        await repository.save(contact);
      }

      const contactsExpected = await repository.searchAll(account.id);
      expect(contactsExpected.sort((a, b) => Contact.sortById(a, b))).toEqual(
        contacts.sort((a, b) => Contact.sortById(a, b))
      );
    });

    it('Should´t return contacts from other account ', async () => {
      const otherAccount = await enviromentManager.createAccount();

      const otherAccountContacts = [
        ContactMother.withAccount(otherAccount.id),
        ContactMother.withAccount(otherAccount.id),
        ContactMother.withAccount(otherAccount.id),
      ];

      for (const contact of otherAccountContacts) {
        await repository.save(contact);
      }

      const thisAccountContacts = await repository.searchAll(account.id);
      expect(thisAccountContacts.length).toBe(0);
    });
  });

  describe('#findById', () => {
    it('Should find contact by its ID', async () => {
      const contact = ContactMother.withAccount(account.id);

      await repository.save(contact);

      const contactExpected = await repository.findById(
        contact.accountId,
        contact.id
      );

      expect(contactExpected).toEqual(contact);
    });

    it('Should return null when contact does not exist', async () => {
      const expected = await repository.findById(
        account.id,
        ContactIdMother.random()
      );
      expect(expected).toBeNull();
    });
  });

  describe('#findByPone', () => {
    it('Should find contact by its phone', async () => {
      const contact = ContactMother.withAccount(account.id);

      await repository.save(contact);

      const contactExpected = await repository.findByPhone(
        contact.accountId,
        contact.phone
      );

      expect(contactExpected).toEqual(contact);
    });

    it('Should return null if contact doesn´t exist', async () => {
      const nullContact = await repository.findByPhone(
        AccountIdMother.random(),
        PhoneMother.random()
      );

      expect(nullContact).toBeNull();
    });
  });
});
