import { Account } from '../../../../src/core/Account/domain/Account';
import {
  container,
  DiDomain,
  DiRepository,
} from '../../../../src/core/Shared/dependency-injection';
import { TestEnvironmentManager } from '../../Shared/infrastructure/TestEnvironmentManager';
import { TemplateMessageMother } from '../domain/TemplateMessageMother';
import { TemplateMessageRepository } from '../../../../src/core/TemplateMessage/domain/TemplateMessageRespository';
import { AccountIdMother } from '../../Account/domain/AccountIdMother';
import { TemplateMessagePersistenceError } from '../../../../src/core/TemplateMessage/domain/exceptions/TemplateMessagePersistenceError';
import { AccountPhoneRepository } from '../../../../src/core/AccountPhone/domain/AccountPhoneRepository';
import { TemplateRepository } from '../../../../src/core/Template/domain/TemplateRepository';
import { ContactRepository } from '../../../../src/core/Contact/domain/ContactRepository';
import { TemplateMother } from '../../Template/domain/TemplateMother';
import { AccountPhone } from '../../../../src/core/AccountPhone/domain/AccountPhone';
import { AccountPhoneMother } from '../../AccountPhone/domain/AccountPhoneMother';
import { ContactMother } from '../../Contact/domain/ContactMother';
import { Contact } from '../../../../src/core/Contact/domain/Contact';
import { Template } from '../../../../src/core/Template/domain/Template';
import { TemplateIdMother } from '../../Template/domain/TemplateIdMother';
import { AccountPhoneIdMother } from '../../AccountPhone/domain/AccountPhoneIdMother';
import { ContactIdMother } from '../../Contact/domain/ContactIdMother';
import { TemplateMessageIdMother } from '../domain/TemplateMessageIdMother';

let account: Account;
let template: Template;
let accountPhone: AccountPhone;
let contact: Contact;

const enviromentManager = container.get<TestEnvironmentManager>(
  DiDomain.environmentManager
);

const repository = container.get<TemplateMessageRepository>(
  DiRepository.templateMessage
);
const accountPhoneRepository = container.get<AccountPhoneRepository>(
  DiRepository.accountPhone
);
const templateRepository = container.get<TemplateRepository>(
  DiRepository.template
);
const contactRepository = container.get<ContactRepository>(
  DiRepository.contact
);

describe('TemplateMessage repository', () => {
  beforeEach(async () => {
    await enviromentManager.truncate();
    account = await enviromentManager.createAccount();

    //  Se graban todas las relaciones necesarias para poder grabar un templateMessage
    template = TemplateMother.withAccount(account.id);
    accountPhone = AccountPhoneMother.withAccount(account.id);
    contact = ContactMother.withAccount(account.id);

    await templateRepository.save(template);
    await accountPhoneRepository.save(accountPhone);
    await contactRepository.save(contact);
  });

  afterAll(async () => {
    await enviromentManager.truncate();
  });

  describe('=> save', () => {
    it('Should save a TemplateMessage', async () => {
      const templateMessage = TemplateMessageMother.withAllRelations(
        account.id,
        template.id,
        accountPhone.id,
        contact.id
      );
      await repository.save(templateMessage);
    });

    it('Can´t save a messageTempalate with inexistent account', async () => {
      const templateMessage = TemplateMessageMother.withAllRelations(
        AccountIdMother.random(),
        template.id,
        accountPhone.id,
        contact.id
      );
      expect(
        async () => await repository.save(templateMessage)
      ).rejects.toThrow(TemplateMessagePersistenceError);
    });

    it('Should throw error if doesn´t have relations', async () => {
      let templateMessage = TemplateMessageMother.withAllRelations(
        account.id,
        TemplateIdMother.random(),
        accountPhone.id,
        contact.id
      );
      expect(
        async () => await repository.save(templateMessage)
      ).rejects.toThrow(TemplateMessagePersistenceError);

      templateMessage = TemplateMessageMother.withAllRelations(
        account.id,
        template.id,
        AccountPhoneIdMother.random(),
        contact.id
      );
      expect(
        async () => await repository.save(templateMessage)
      ).rejects.toThrow(TemplateMessagePersistenceError);

      templateMessage = TemplateMessageMother.withAllRelations(
        account.id,
        template.id,
        accountPhone.id,
        ContactIdMother.random()
      );
      expect(
        async () => await repository.save(templateMessage)
      ).rejects.toThrow(TemplateMessagePersistenceError);
    });
  });

  describe('=> findById', () => {
    it('Should find templateMessage by its ID', async () => {
      const templateMessage = TemplateMessageMother.withAllRelations(
        account.id,
        template.id,
        accountPhone.id,
        contact.id
      );
      await repository.save(templateMessage);

      const templateMessageExpected = await repository.findById(
        templateMessage.accountId,
        templateMessage.id
      );

      expect(templateMessageExpected).toEqual(templateMessage);
    });

    it('Should return null when template does not exist', async () => {
      const expected = await repository.findById(
        account.id,
        TemplateMessageIdMother.random()
      );
      expect(expected).toBeNull();
    });
  });

  //   describe('=> searchAll', () => {
  // it('Should return all templates', async () => {
  //   const templates = [
  //     TemplateMother.withAccount(account.id),
  //     TemplateMother.withAccount(account.id),
  //     TemplateMother.withAccount(account.id),
  //   ];
  //   for (const template of templates) {
  //     await repository.save(template);
  //   }
  //   const templatesExpected = await repository.searchAll(account.id);
  //   expect(templatesExpected.sort((a, b) => Template.sortById(a, b))).toEqual(
  //     templates.sort((a, b) => Template.sortById(a, b))
  //   );
  // });

  // it('Should´t return templates from other account ', async () => {
  //   const otherAccount = await enviromentManager.createAccount();
  //   const otherAccountTemplates = [
  //     TemplateMother.withAccount(otherAccount.id),
  //     TemplateMother.withAccount(otherAccount.id),
  //     TemplateMother.withAccount(otherAccount.id),
  //   ];
  //   for (const template of otherAccountTemplates) {
  //     await repository.save(template);
  //   }
  //   const thisAccountTemplates = await repository.searchAll(account.id);
  //   expect(thisAccountTemplates.length).toBe(0);
  // });
  // });

  //   describe('=> findByName', () => {
  //     it('Should find template by its name', async () => {
  //       const template = TemplateMother.withAccount(account.id);

  //       await repository.save(template);

  //       const templateExpected = await repository.findByName(
  //         template.accountId,
  //         template.name
  //       );

  //       expect(templateExpected).toEqual(template);
  //     });

  //     it('Should return null if template doesn´t exist', async () => {
  //       const nullTemplate = await repository.findByName(
  //         AccountIdMother.random(),
  //         TemplateNameMother.random()
  //       );

  //       expect(nullTemplate).toBeNull();
  //     });
  //   });
});
