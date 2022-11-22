import { AccountId } from '../../../../src/core/Account/domain/value-object/AccountId';
import { Category } from '../../../../src/core/Category/domain/Category';
import { CategoryRepository } from '../../../../src/core/Category/domain/CategoryRepository';
import { CategoryId } from '../../../../src/core/Category/domain/value-object/CategoryId';
import { Nullable } from '../../../../src/core/Shared/domain/Nullable';
import { CategoryNotFoundError } from '../../../../src/core/Category/domain/exceptions/CategoryNotFoundError';
import { CategoryName } from '../../../../src/core/Category/domain/value-object/CategoryName';

export class CategoryRepositoryMock implements CategoryRepository {
  mockSearchAll = jest.fn();
  mockSearchByName = jest.fn();
  mockSave = jest.fn();
  mockFindById = jest.fn();

  private categoryByName: Nullable<Category> = null;
  private allCategories: Array<Category> = [];
  private catgoryById?: Category;

  returnSearchAll(categories: Array<Category>): void {
    this.allCategories = categories;
  }

  returnFindById(category: Category): void {
    this.catgoryById = category;
  }

  returnSearchByName(category: Category): void {
    this.categoryByName = category;
  }

  async searchAll(accountId: AccountId): Promise<Array<Category>> {
    this.mockSearchAll(accountId);

    return this.allCategories;
  }

  async save(category: Category): Promise<void> {
    this.mockSave(category);
  }

  async findById(accountId: AccountId, id: CategoryId): Promise<Category> {
    this.mockFindById(accountId, id);

    if (!this.catgoryById) {
      throw new CategoryNotFoundError(id);
    }
    return this.catgoryById;
  }

  async searchByName(
    accountId: AccountId,
    name: CategoryName
  ): Promise<Nullable<Category>> {
    this.mockSearchByName(accountId, name);
    return this.categoryByName;
  }
}
