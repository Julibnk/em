import { CategoryMother } from '../domain/CategoryMother';
import { CategoryRepositoryMock } from '../__mocks__/CategoryRepositoryMock';
import { SearchAllCategoriesUseCase } from '../../../../src/core/Category/application/SearchAllCategories';
import { AccountIdMother } from '../../Account/domain/AccountIdMother';

const repository = new CategoryRepositoryMock();
const searchAllCategoriesUseCase = new SearchAllCategoriesUseCase(repository);

describe('SearchAllCategories use case', () => {
  it('Should return all categories', async () => {
    const accountId = AccountIdMother.random();
    const categories = [
      CategoryMother.withAccount(accountId),
      CategoryMother.withAccount(accountId),
      CategoryMother.withAccount(accountId),
    ];

    repository.returnSearchAll(categories);

    const expexctedCategories = await searchAllCategoriesUseCase.run(
      accountId.value
    );

    repository.assertSearchAllHasBeenCalledWith(accountId);
    expect(expexctedCategories).toEqual(categories);
  });
});
