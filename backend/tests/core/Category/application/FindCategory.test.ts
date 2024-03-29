import { FindCategoryUseCase } from '../../../../src/core/Category/application/FindCategory';
import { Category } from '../../../../src/core/Category/domain/Category';
import { CategoryMother } from '../domain/CategoryMother';
import { CategoryRepositoryMock } from '../__mocks__/CategoryRepositoryMock';
import { CategoryNotFoundError } from '../../../../src/core/Category/domain/exceptions/CategoryNotFoundError';

let repository: CategoryRepositoryMock;
let findCategoryUseCase: FindCategoryUseCase;
let category: Category;

describe('FindCategory use case', () => {
  beforeEach(() => {
    repository = new CategoryRepositoryMock();
    findCategoryUseCase = new FindCategoryUseCase(repository);
    category = CategoryMother.random();
  });

  it('Repository should be called with account and template id', async () => {
    repository.returnFindById(category);

    await findCategoryUseCase.run(category.accountId.value, category.id.value);

    expect(repository.mockFindById).toHaveBeenCalledWith(
      category.accountId,
      category.id
    );
  });

  it('Should throw error if category doesnt exist', () => {
    expect(
      async () =>
        await findCategoryUseCase.run(
          category.accountId.value,
          category.id.value
        )
    ).rejects.toThrow(CategoryNotFoundError);
  });
});
