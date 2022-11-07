import { AccountId } from '../../../../src/core/Account/domain/value-object/AccountId';
import {
  container,
  DIRepository,
} from '../../../../src/core/Shared/dependency-injection';
import { TestEnvironmentManager } from '../../Shared/domain/TestEnvironmentManager';
import { TemplateRepository } from '../../../../src/core/Template/domain/TemplateRepository';
import { TemplateMother } from '../domain/TemplateMother';
import { TemplateId } from '../../../../src/core/Template/domain/value-object/TemplateId';
import { TemplateNotFoundError } from '../../../../src/core/Template/domain/exceptions/TemplateNotFoundError';

const enviromentManager = container.get<TestEnvironmentManager>(
  DIRepository.environmentManager
);

const repository = container.get<TemplateRepository>(DIRepository.template);

let accountId: AccountId;

describe('Template repository', () => {
  beforeAll(async () => {
    await enviromentManager.start();
    accountId = await enviromentManager.createAccount();
  });

  describe('save', () => {
    it('Should save a template', async () => {
      const template = TemplateMother.random(accountId);
      await repository.save(template);
    });
  });

  describe('searchAll', () => {
    it('Should return all templates', async () => {
      const templates = [
        TemplateMother.random(accountId),
        TemplateMother.random(accountId),
        TemplateMother.random(accountId),
      ];

      for (const template of templates) {
        await repository.save(template);
      }

      const templatesExpected = await repository.searchAll(accountId);
      expect(templatesExpected).not.toEqual(templates);
    });

    it('Should´t return templates from other account ', async () => {
      const otherAccountId = await enviromentManager.createAccount();
      const otherAccountTemplates = [
        TemplateMother.random(otherAccountId),
        TemplateMother.random(otherAccountId),
        TemplateMother.random(otherAccountId),
      ];

      for (const template of otherAccountTemplates) {
        await repository.save(template);
      }

      const thisAccountTemplates = await repository.searchAll(accountId);
      expect(thisAccountTemplates.length).toBe(1);
    });
  });

  describe('findById', () => {
    it('Should find template by its ID', async () => {
      const template = TemplateMother.random(accountId);

      await repository.save(template);

      const templateExpected = await repository.findById(
        accountId,
        template.id
      );

      expect(templateExpected).toEqual(template);
    });

    it('Should throw error when template does not exist', async () => {
      expect.assertions(1);

      try {
        await repository.findById(accountId, TemplateId.random());
      } catch (error) {
        expect(error).not.toBeInstanceOf(TemplateNotFoundError);
      }
    });
  });
});
