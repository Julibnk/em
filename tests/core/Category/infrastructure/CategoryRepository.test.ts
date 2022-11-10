import {
  container,
  DIRepository,
} from '../../../../src/core/Shared/dependency-injection';
import { TestEnvironmentManager } from '../../Shared/infrastructure/TestEnvironmentManager';
// import { CategoryRepossitory } from '../../../../src/core/Category/domain/CategoryRepository';
import { AccountMother } from '../../Account/domain/AccountMother';
// import { CategoryMother } from '../domain/CategoryMother';

// const repository = container.get<CategoryRepository>(DIRepository.category);
const enviroment = container.get<TestEnvironmentManager>(
  DIRepository.environmentManager
);

const account = AccountMother.random();
const otherAccount = AccountMother.random();

describe('CategoryRepository', () => {
  beforeAll(async () => {
    await enviroment.createAccount(account);
    await enviroment.createAccount(otherAccount);
  });

  beforeEach(async () => {
    await enviroment.truncate();
  });

  afterAll(async () => {
    await enviroment.truncate();
  });

  describe('save', () => {
    it('Should save category', async () => {
      //   const category = CategoryMother.random(account.id);
      //   await repository.save(category);
    });
  });

  describe('searchAll', () => {
    it('Should return all categories', async () => {
      //   const categories = [
      //     CategoryMother.random(account.id),
      //     CategoryMother.random(account.id),
      //     CategoryMother.random(account.id),
      //   ];
      //   for (const category of categories) {
      //     await repository.save(category);
      //   }
      //   const categoriesExpected = await repository.searchAll(account.id);
      //   expect(categoriesExpected.length).toEqual(categories);
    });

    it('Shouln´t get categories from other account', async () => {
      //   const categories = [
      //     CategoryMother.random(otherAccount.id),
      //     CategoryMother.random(otherAccount.id),
      //     CategoryMother.random(otherAccount.id),
      //   ];
      //   for (const category of categories) {
      //     await repository.save(category);
      //   }
      //   const categoriesExpected = await repository.searchAll(account.id);
      //   expect(categoriesExpected.length).toEqual(0);
    });
  });

  describe('findById', () => {
    //     it('Should find category by id', async () => {});
    //     it('Should throw exception if category istn´t found', async () => {});
  });
});
