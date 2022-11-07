import {
  container,
  DIRepository,
} from '../../../../src/core/Shared/dependency-injection';
import { TestEnvironmentManager } from '../../Shared/domain/TestEnvironmentManager';
import { TemplateRepository } from '../../../../src/core/Template/domain/TemplateRepository';
import { TemplateMother } from '../domain/TemplateMother';
import { TemplateId } from '../../../../src/core/Template/domain/value-object/TemplateId';
import { TemplateNotFoundError } from '../../../../src/core/Template/domain/exceptions/TemplateNotFoundError';
import { AccountMother } from '../../Account/domain/AccountMother';
import { Template } from '../../../../src/core/Template/domain/Template';

const enviromentManager = container.get<TestEnvironmentManager>(
  DIRepository.environmentManager
);

const repository = container.get<TemplateRepository>(DIRepository.template);

const account = AccountMother.random();
const otherAccount = AccountMother.random();

describe('Template repository', () => {
  beforeAll(async () => {
    await enviromentManager.createAccount(account);
    await enviromentManager.createAccount(otherAccount);
  });

  beforeEach(async () => {
    await enviromentManager.truncate();
  });

  afterAll(async () => {
    await enviromentManager.truncate();
    await enviromentManager.deleteAccount(account);
    await enviromentManager.deleteAccount(otherAccount);
  });

  describe('save', () => {
    it('Should save a template', async () => {
      const template = TemplateMother.random(account.id);
      await repository.save(template);
    });
  });

  describe('searchAll', () => {
    it('Should return all templates', async () => {
      const templates = [
        TemplateMother.random(account.id),
        TemplateMother.random(account.id),
        TemplateMother.random(account.id),
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
      const otherAccountTemplates = [
        TemplateMother.random(otherAccount.id),
        TemplateMother.random(otherAccount.id),
        TemplateMother.random(otherAccount.id),
      ];

      for (const template of otherAccountTemplates) {
        await repository.save(template);
      }

      const thisAccountTemplates = await repository.searchAll(account.id);
      expect(thisAccountTemplates.length).toBe(0);
    });
  });

  describe('findById', () => {
    it('Should find template by its ID', async () => {
      const template = TemplateMother.random(account.id);

      await repository.save(template);

      const templateExpected = await repository.findById(
        account.id,
        template.id
      );

      expect(templateExpected).toEqual(template);
    });

    it('Should throw error when template does not exist', async () => {
      expect.assertions(1);

      try {
        await repository.findById(account.id, TemplateId.random());
      } catch (error) {
        expect(error).toBeInstanceOf(TemplateNotFoundError);
      }
    });
  });
});
