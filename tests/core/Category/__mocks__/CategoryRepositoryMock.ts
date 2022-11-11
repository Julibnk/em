import { AccountId } from '../../../../src/core/Account/domain/value-object/AccountId';
import { Category } from '../../../../src/core/Category/domain/Category';
import { CategoryRepository } from '../../../../src/core/Category/domain/CategoryRepository';
import { CategoryId } from '../../../../src/core/Category/domain/value-object/CategoryId';
import { Nullable } from '../../../../src/core/Shared/domain/Nullable';
import { CategoryNotFoundError } from '../../../../src/core/Category/domain/exceptions/CategoryNotFoundError';
import { CategoryName } from '../../../../src/core/Category/domain/value-object/CategoryName';

export class CategoryRepositoryMock implements CategoryRepository {
  private mockSearchAll = jest.fn();
  private mockSearchByName = jest.fn();
  private mockSave = jest.fn();
  private mockFindById = jest.fn();

  private category: Nullable<Category> = null;
  private categories: Array<Category> = [];

  returnSearchAll(categories: Array<Category>): void {
    this.categories = categories;
  }

  returnFindById(category: Category): void {
    this.category = category;
  }

  returnSearchByName(category: Category): void {
    this.category = category;
  }

  async searchAll(accountId: AccountId): Promise<Array<Category>> {
    this.mockSearchAll(accountId);

    return this.categories;
  }

  async save(category: Category): Promise<void> {
    this.mockSave(category);
  }

  async findById(accountId: AccountId, id: CategoryId): Promise<Category> {
    this.mockFindById(accountId, id);

    if (!this.category) {
      throw new CategoryNotFoundError(accountId, id);
    }
    return this.category;
  }

  async searchByName(
    accountId: AccountId,
    name: CategoryName
  ): Promise<Nullable<Category>> {
    this.mockSearchByName(accountId, name);
    return this.category;
  }

  assertSaveHasBeenCalledWith(category: Category): void {
    expect(this.mockSave).toHaveBeenCalledWith(category);
  }

  assertSaveHasNotBeenCalledWith(category: Category): void {
    expect(this.mockSave).not.toHaveBeenCalledWith(category);
  }

  assertSearchAllHasBeenCalledWith(accountId: AccountId): void {
    expect(this.mockSearchAll).toHaveBeenCalledWith(accountId);
  }
}
