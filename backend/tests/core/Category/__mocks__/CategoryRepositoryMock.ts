import { AccountId } from '../../../../src/core/Account/domain/value-object/AccountId';
import { Category } from '../../../../src/core/Category/domain/Category';
import { CategoryRepository } from '../../../../src/core/Category/domain/CategoryRepository';
import { CategoryId } from '../../../../src/core/Category/domain/value-object/CategoryId';
import { Nullable } from '../../../../src/core/Shared/domain/Nullable';
import { CategoryName } from '../../../../src/core/Category/domain/value-object/CategoryName';

export class CategoryRepositoryMock implements CategoryRepository {
  mockSearchAll = jest.fn();
  mockFindByName = jest.fn();
  mockSave = jest.fn();
  mockFindById = jest.fn();

  private categoryByName: Nullable<Category> = null;
  private allCategories: Array<Category> = [];
  private catgoryById: Nullable<Category> = null;

  returnSearchAll(categories: Array<Category>): void {
    this.allCategories = categories;
  }

  returnFindById(category: Category): void {
    this.catgoryById = category;
  }

  returnFindByName(category: Category): void {
    this.categoryByName = category;
  }

  async searchAll(accountId: AccountId): Promise<Array<Category>> {
    this.mockSearchAll(accountId);

    return this.allCategories;
  }

  async save(category: Category): Promise<void> {
    this.mockSave(category);
  }

  async findById(
    accountId: AccountId,
    id: CategoryId
  ): Promise<Nullable<Category>> {
    this.mockFindById(accountId, id);

    return this.catgoryById;
  }

  async findByName(
    accountId: AccountId,
    name: CategoryName
  ): Promise<Nullable<Category>> {
    this.mockFindByName(accountId, name);
    return this.categoryByName;
  }
}
