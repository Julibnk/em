import { SaveCategoryUseCase } from '../../../../src/core/Category/application/SaveCategory';
import { CategoryRepositoryMock } from '../__mocks__/CategoryRepositoryMock';
import { CategoryMother } from '../domain/CategoryMother';
import { CategoryWithSameNameAlreadyExistsError } from '../../../../src/core/Category/domain/exceptions/CategoryWithSameNameAlreadyExistsError';
import { CategoryNameMother } from '../domain/CategoryNameMother';
import { TemplateIdMother } from '../../Template/domain/TemplateIdMother';
import { CategoryDescriptionMother } from '../domain/CategoryDescriptionMother';

let repository: CategoryRepositoryMock;
let saveCategoryUseCase: SaveCategoryUseCase;

// let createT: SearchAllTemplatesUseCase;

describe('SaveCategory use case', () => {
  beforeEach(() => {
    repository = new CategoryRepositoryMock();
    saveCategoryUseCase = new SaveCategoryUseCase(repository);
  });

  it('Should create a category', async () => {
    const category = CategoryMother.random();

    const useCaseParams = {
      accountId: category.accountId.value,
      id: category.id.value,
      name: category.name.value,
      description: category.description.value,
      templateIds: category.templateIds.map((id) => id.value),
    };

    await saveCategoryUseCase.run(useCaseParams);
    repository.assertSaveHasBeenCalledWith(category);
  });

  it('Should throw an exception if category with same name exists', async () => {
    const category = CategoryMother.random();
    repository.returnSearchByName(category);

    const useCaseParams = {
      accountId: category.accountId.value,
      id: category.id.value,
      name: category.name.value,
      description: category.description.value,
      templateIds: category.templateIds.map((id) => id.value),
    };

    try {
      await saveCategoryUseCase.run(useCaseParams);
    } catch (error) {
      expect(error).toBeInstanceOf(CategoryWithSameNameAlreadyExistsError);
    }
  });

  it('Should update category if already exists', async () => {
    const category = CategoryMother.random();
    repository.returnFindById(category);

    //  Se crea una copia de la plantilla original para romper la referencia y comprobar que ambas versiones son distintas
    const originalCategory = CategoryMother.makeCopy(category);

    category.change(
      CategoryNameMother.random(),
      CategoryDescriptionMother.random(),
      [TemplateIdMother.random(), TemplateIdMother.random()]
    );

    await saveCategoryUseCase.run({
      accountId: category.accountId.value,
      id: category.id.value,
      name: category.name.value,
      description: category.description.value,
      templateIds: category.templateIds.map((id) => id.value),
    });

    repository.assertSaveHasBeenCalledWith(category);
    repository.assertSaveHasNotBeenCalledWith(originalCategory);
  });
});
