import {
  SaveCategoryUseCase,
  Params,
} from '../../../../src/core/Category/application/SaveCategory';
import { CategoryRepositoryMock } from '../__mocks__/CategoryRepositoryMock';
import { CategoryMother } from '../domain/CategoryMother';
import { CategoryWithSameNameAlreadyExistsError } from '../../../../src/core/Category/domain/exceptions/CategoryWithSameNameAlreadyExistsError';
import { CategoryNameMother } from '../domain/CategoryNameMother';
import { TemplateIdMother } from '../../Template/domain/TemplateIdMother';
import { CategoryDescriptionMother } from '../domain/CategoryDescriptionMother';
import { Category } from '../../../../src/core/Category/domain/Category';

let repository: CategoryRepositoryMock;
let saveCategoryUseCase: SaveCategoryUseCase;
let category: Category;

describe('SaveCategory use case', () => {
  beforeEach(() => {
    repository = new CategoryRepositoryMock();
    saveCategoryUseCase = new SaveCategoryUseCase(repository);
    category = CategoryMother.random();
  });

  describe('#New category', () => {
    it('Should create a category', async () => {
      const useCaseParams = fillUseCaseParams(category);

      await saveCategoryUseCase.run(useCaseParams);
      expect(repository.mockSave).toHaveBeenCalledWith(category);
    });

    it('Should throw an exception if category with same name exists', async () => {
      expect.assertions(1);
      const categoryWithSameName = CategoryMother.withName(category.name);
      repository.returnSearchByName(categoryWithSameName);

      const useCaseParams = fillUseCaseParams(category);

      try {
        await saveCategoryUseCase.run(useCaseParams);
      } catch (error) {
        expect(error).toBeInstanceOf(CategoryWithSameNameAlreadyExistsError);
      }
    });
  });

  describe('#Update category', () => {
    it('Should update category if already exists', async () => {
      // const category = CategoryMother.random();
      repository.returnFindById(category);

      //  Se crea una copia de la plantilla original para romper la referencia y comprobar que ambas versiones son distintas
      const originalCategory = CategoryMother.makeCopy(category);

      category.change(
        CategoryNameMother.random(),
        CategoryDescriptionMother.random(),
        [TemplateIdMother.random(), TemplateIdMother.random()]
      );

      const useCaseParams = fillUseCaseParams(category);

      await saveCategoryUseCase.run(useCaseParams);

      expect(repository.mockSave).toHaveBeenCalledWith(category);
      expect(repository.mockSave).not.toHaveBeenCalledWith(originalCategory);
    });
  });
});

const fillUseCaseParams = (category: Category): Params => {
  return {
    accountId: category.accountId.value,
    id: category.id.value,
    name: category.name.value,
    description: category.description.value,
    templateIds: category.templateIds.map((id) => id.value),
  };
};
