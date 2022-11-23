import { SaveCategoryUseCase } from '../../../../src/core/Category/application/SaveCategory';
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

  describe('=> New category', () => {
    it('Should create a category', async () => {
      const useCaseParams = { ...category.toPrimitives() };

      await saveCategoryUseCase.run(useCaseParams);
      expect(repository.mockSave).toHaveBeenCalledWith(category);
    });

    it('Should throw an exception if category with same name exists', async () => {
      expect.assertions(1);
      const categoryWithSameName = CategoryMother.withName(category.name);
      repository.returnFindByName(categoryWithSameName);

      const useCaseParams = { ...category.toPrimitives() };

      expect(
        async () => await saveCategoryUseCase.run(useCaseParams)
      ).rejects.toThrow(CategoryWithSameNameAlreadyExistsError);
    });
  });

  describe('=> Update category', () => {
    it('Should update category if already exists', async () => {
      //  Se crea una copia de la plantilla original para romper la referencia y comprobar que ambas versiones son distintas
      repository.returnFindById(category);

      const originalCategory = CategoryMother.makeCopy(category);
      const changedCategory = CategoryMother.makeCopy(category);

      changedCategory.change(
        CategoryNameMother.random(),
        CategoryDescriptionMother.random(),
        [TemplateIdMother.random(), TemplateIdMother.random()]
      );

      const useCaseParams = { ...changedCategory.toPrimitives() };

      await saveCategoryUseCase.run(useCaseParams);

      expect(repository.mockSave).toHaveBeenCalledWith(changedCategory);
      expect(repository.mockSave).not.toHaveBeenCalledWith(originalCategory);
    });
  });
});
