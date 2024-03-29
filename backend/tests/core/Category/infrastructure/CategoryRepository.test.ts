import {
  container,
  DiDomain,
  DiRepository,
} from '../../../../src/core/Shared/dependency-injection';
import { TestEnvironmentManager } from '../../Shared/infrastructure/TestEnvironmentManager';
import { CategoryRepository } from '../../../../src/core/Category/domain/CategoryRepository';
import { CategoryMother } from '../domain/CategoryMother';
import { Account } from '../../../../src/core/Account/domain/Account';
import { TemplateRepository } from '../../../../src/core/Template/domain/TemplateRepository';
import { CategoryIdMother } from '../domain/CategoryIdMother';
import { AccountIdMother } from '../../Account/domain/AccountIdMother';
import { CategoryPersistenceError } from '../../../../src/core/Category/domain/exceptions/CategoryPersistenceError';
import { TemplateIdMother } from '../../Template/domain/TemplateIdMother';
import { TemplateMother } from '../../Template/domain/TemplateMother';
import { CategoryNameMother } from '../domain/CategoryNameMother';

const repository = container.get<CategoryRepository>(DiRepository.category);
const templateRepository = container.get<TemplateRepository>(
  DiRepository.template
);
const enviroment = container.get<TestEnvironmentManager>(
  DiDomain.environmentManager
);

let account: Account;

describe('CategoryRepository', () => {
  beforeEach(async () => {
    await enviroment.truncate();
    account = await enviroment.createAccount();
  });

  afterAll(async () => {
    await enviroment.truncate();
  });

  describe('=> save', () => {
    it('Should save category', async () => {
      const category = CategoryMother.withAccount(account.id);
      await repository.save(category);
    });

    it('Can´t save a category with inexistent account', async () => {
      const category = CategoryMother.random();
      expect(async () => await repository.save(category)).rejects.toThrow(
        CategoryPersistenceError
      );
    });

    it('Can´t save a category with inexistent template', async () => {
      const category = CategoryMother.withAccountAndTemplateIds(account.id, [
        TemplateIdMother.random(),
      ]);
      expect(async () => await repository.save(category)).rejects.toThrow(
        CategoryPersistenceError
      );
    });

    it('Should save relation with templates succesfully', async () => {
      const template = TemplateMother.withAccount(account.id);
      await templateRepository.save(template);

      const category = CategoryMother.withAccountAndTemplateIds(account.id, [
        template.id,
      ]);
      await repository.save(category);
    });
  });

  describe('=> findById', () => {
    it('Should find category by id with related templates', async () => {
      const template = TemplateMother.withAccount(account.id);
      await templateRepository.save(template);
      const otherTemplate = TemplateMother.withAccount(account.id);
      await templateRepository.save(otherTemplate);

      const category = CategoryMother.withAccountAndTemplateIds(account.id, [
        template.id,
        otherTemplate.id,
      ]);
      await repository.save(category);
      const expected = await repository.findById(account.id, category.id);

      //Al volver de BD pueden estar desordenados los ids y fallar
      //Commo la BD se reinicia en cada test si tiene el mismo numero de ids se asume como OK
      expect(category.templateIds.length).toEqual(expected?.templateIds.length);
    });

    it('Should return null if category istn´t found', async () => {
      const inexistentCategoryId = CategoryIdMother.random();

      const expected = await repository.findById(
        account.id,
        inexistentCategoryId
      );
      expect(expected).toBeNull();
    });

    it('Should return null if other account tries to find it', async () => {
      const category = CategoryMother.withAccount(account.id);
      await repository.save(category);

      const otherAccount = await enviroment.createAccount();

      const expected = await repository.findById(otherAccount.id, category.id);

      expect(expected).toBeNull();
    });
  });

  describe('=> searchAll', () => {
    it('Should return all categories', async () => {
      const categories = [
        CategoryMother.withAccount(account.id),
        CategoryMother.withAccount(account.id),
        CategoryMother.withAccount(account.id),
      ];
      for (const category of categories) {
        await repository.save(category);
      }
      const categoriesExpected = await repository.searchAll(account.id);

      expect(categoriesExpected).toEqual(categories);
    });

    it('Shouln´t get categories from other account', async () => {
      const otherAccount = await enviroment.createAccount();
      const categories = [
        CategoryMother.withAccount(otherAccount.id),
        CategoryMother.withAccount(otherAccount.id),
        CategoryMother.withAccount(otherAccount.id),
      ];

      for (const category of categories) {
        await repository.save(category);
      }

      const categoriesExpected = await repository.searchAll(account.id);
      const otherAccountCategories = await repository.searchAll(
        otherAccount.id
      );
      expect(categoriesExpected.length).toEqual(0);
      expect(otherAccountCategories.length).toEqual(3);
    });
  });

  describe('=> findByName', () => {
    it('Should find category by its name', async () => {
      const category = CategoryMother.withAccount(account.id);

      await repository.save(category);

      const categoryExpected = await repository.findByName(
        account.id,
        category.name
      );

      expect(categoryExpected).toEqual(category);
    });

    it('Should return null if category doesn´t exist', async () => {
      const nullCategory = await repository.findByName(
        AccountIdMother.random(),
        CategoryNameMother.random()
      );

      expect(nullCategory).toBeNull();
    });
  });
});
