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
import { ContactNotFoundError } from '../../../../src/core/Contact/domain/exceptions/ContactNotFoundError';
import { PhoneMother } from '../../Shared/domain/Phone/PhoneMother';

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

    it('Should throw error when contact does not exist', async () => {
      expect(async () => {
        await repository.findById(account.id, ContactIdMother.random());
      }).rejects.toThrow(ContactNotFoundError);
    });
  });

  describe('#searchByPone', () => {
    it('Should find contact by its phone', async () => {
      const contact = ContactMother.withAccount(account.id);

      await repository.save(contact);

      const contactExpected = await repository.searchByPhone(
        contact.accountId,
        contact.phone
      );

      expect(contactExpected).toEqual(contact);
    });

    it('Should return null if contact doesn´t exist', async () => {
      const nullContact = await repository.searchByPhone(
        AccountIdMother.random(),
        PhoneMother.random()
      );

      expect(nullContact).toBeNull();
    });
  });
});
