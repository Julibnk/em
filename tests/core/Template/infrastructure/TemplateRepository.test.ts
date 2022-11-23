import {
  container,
  DiDomain,
  DiRepository,
} from '../../../../src/core/Shared/dependency-injection';
import { TestEnvironmentManager } from '../../Shared/infrastructure/TestEnvironmentManager';
import { TemplateRepository } from '../../../../src/core/Template/domain/TemplateRepository';
import { TemplateMother } from '../domain/TemplateMother';
import { Template } from '../../../../src/core/Template/domain/Template';
import { TemplateNameMother } from '../domain/TemplateNameMother';
import { AccountIdMother } from '../../Account/domain/AccountIdMother';
import { Account } from '../../../../src/core/Account/domain/Account';
import { TemplateIdMother } from '../domain/TemplateIdMother';
import { TemplatePersistenceError } from '../../../../src/core/Template/domain/exceptions/TemplatePersistenceError';

let account: Account;

const enviromentManager = container.get<TestEnvironmentManager>(
  DiDomain.environmentManager
);
const repository = container.get<TemplateRepository>(DiRepository.template);

describe('Template repository', () => {
  beforeEach(async () => {
    await enviromentManager.truncate();
    account = await enviromentManager.createAccount();
  });

  afterAll(async () => {
    await enviromentManager.truncate();
  });

  describe('#save', () => {
    it('Should save a template', async () => {
      const template = TemplateMother.withAccount(account.id);
      await repository.save(template);
    });

    it('Can´t save a template with inexistent account', async () => {
      const template = TemplateMother.withAccount(AccountIdMother.random());
      expect(async () => await repository.save(template)).rejects.toThrow(
        TemplatePersistenceError
      );
    });
  });

  describe('#searchAll', () => {
    it('Should return all templates', async () => {
      const templates = [
        TemplateMother.withAccount(account.id),
        TemplateMother.withAccount(account.id),
        TemplateMother.withAccount(account.id),
      ];

      for (const template of templates) {
        await repository.save(template);
      }

      const templatesExpected = await repository.searchAll(account.id);
      expect(templatesExpected.sort((a, b) => Template.sortById(a, b))).toEqual(
        templates.sort((a, b) => Template.sortById(a, b))
      );
    });

    it('Should´t return templates from other account ', async () => {
      const otherAccount = await enviromentManager.createAccount();

      const otherAccountTemplates = [
        TemplateMother.withAccount(otherAccount.id),
        TemplateMother.withAccount(otherAccount.id),
        TemplateMother.withAccount(otherAccount.id),
      ];

      for (const template of otherAccountTemplates) {
        await repository.save(template);
      }

      const thisAccountTemplates = await repository.searchAll(account.id);
      expect(thisAccountTemplates.length).toBe(0);
    });
  });

  describe('#findByName', () => {
    it('Should find template by its name', async () => {
      const template = TemplateMother.withAccount(account.id);

      await repository.save(template);

      const templateExpected = await repository.findByName(
        template.accountId,
        template.name
      );

      expect(templateExpected).toEqual(template);
    });

    it('Should return null if template doesn´t exist', async () => {
      const nullTemplate = await repository.findByName(
        AccountIdMother.random(),
        TemplateNameMother.random()
      );

      expect(nullTemplate).toBeNull();
    });
  });

  describe('#findById', () => {
    it('Should find template by its ID', async () => {
      const template = TemplateMother.withAccount(account.id);

      await repository.save(template);

      const templateExpected = await repository.findById(
        template.accountId,
        template.id
      );

      expect(templateExpected).toEqual(template);
    });

    it('Should return null when template does not exist', async () => {
      const expected = await repository.findById(
        account.id,
        TemplateIdMother.random()
      );
      expect(expected).toBeNull();
    });
  });
});
