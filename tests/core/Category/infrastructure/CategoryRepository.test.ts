import {
  container,
  DIRepository,
} from '../../../../src/core/Shared/dependency-injection';
import { TestEnvironmentManager } from '../../Shared/infrastructure/TestEnvironmentManager';
import { CategoryRepository } from '../../../../src/core/Category/domain/CategoryRepository';
import { CategoryMother } from '../domain/CategoryMother';
import { Account } from '../../../../src/core/Account/domain/Account';
// import { TemplateRepository } from '../../../../src/core/Template/domain/TemplateRepository';
import { CategoryNotFoundError } from '../../../../src/core/Category/domain/exceptions/CategoryNotFoundError';
import { CategoryIdMother } from '../domain/CategoryIdMother';
// import { TemplateMother } from '../../Template/domain/TemplateMother';

const repository = container.get<CategoryRepository>(DIRepository.category);
// const templateRepository = container.get<TemplateRepository>(
//   DIRepository.template
// );
const enviroment = container.get<TestEnvironmentManager>(
  DIRepository.environmentManager
);

let account: Account;

describe.only('CategoryRepository', () => {
  beforeEach(async () => {
    await enviroment.truncate();
    account = await enviroment.createAccount();
  });

  afterAll(async () => {
    await enviroment.truncate();
  });

  describe('save', () => {
    it('Should save category', async () => {
      const category = CategoryMother.random(account.id);
      await repository.save(category);
    });
  });

  describe('findById', () => {
    it('Should find category by id', async () => {
      const category = CategoryMother.random(account.id);
      await repository.save(category);
      const expected = await repository.findById(account.id, category.id);
      expect(category).toEqual(expected);
    });

    it('Should throw exception if category istn´t found', async () => {
      const inexistentCategoryId = CategoryIdMother.random();

      expect(async () => {
        await repository.findById(account.id, inexistentCategoryId);
      }).rejects.toThrow(CategoryNotFoundError);
    });

    it('Should throw exception if other account tries to find it', async () => {
      const category = CategoryMother.random(account.id);
      await repository.save(category);

      const otherAccount = await enviroment.createAccount();

      expect(
        async () => await repository.findById(otherAccount.id, category.id)
      ).rejects.toThrow(CategoryNotFoundError);
    });
  });

  describe('searchAll', () => {
    it('Should return all categories', async () => {
      const categories = [
        CategoryMother.random(account.id),
        CategoryMother.random(account.id),
        CategoryMother.random(account.id),
      ];
      for (const category of categories) {
        await repository.save(category);
      }
      const categoriesExpected = await repository.searchAll(account.id);

      expect(categoriesExpected).toEqual(categories);
    });

    it('Shouln´t get categories from other account', async () => {
      expect.assertions(2);

      const otherAccount = await enviroment.createAccount();
      const categories = [
        CategoryMother.random(otherAccount.id),
        CategoryMother.random(otherAccount.id),
        CategoryMother.random(otherAccount.id),
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

  describe('Template relationship', () => {
    // it('SHould save template relation' ,() => {})
    it('A ver k pasa', () => {
      // category
      // const templateRepository = TemplateMother.random(account.id);
    });
  });
});
