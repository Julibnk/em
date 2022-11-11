import {
  SaveTemplateUseCase,
  Params,
} from '../../../../src/core/Template/application/SaveTemplate';
import { TemplateMother } from '../domain/TemplateMother';
import { TemplateRepositoryMock } from '../__mocks__/TemplateRepositoryMock';
import { TemplateWithSameNameAlreadyExistsError } from '../../../../src/core/Template/domain/exceptions/TemplateWithSameNameAlreadyExistsError';
import { TemplateShortDescriptionMother } from '../domain/TemplateShortDescriptionMother';
import { TemplateVariableMother } from '../domain/TemplateVariableMother';
import { TemplatePreviewMother } from '../domain/TemplatePreviewMother';
import { InconsistentTemplateVariableError } from '../../../../src/core/Template/domain/exceptions/InconsistentTemplateVariableError';
import { Template } from '../../../../src/core/Template/domain/Template';

let repository: TemplateRepositoryMock;
let saveTemplateUseCase: SaveTemplateUseCase;
let template: Template;

describe('SaveTemplate use case', () => {
  beforeEach(() => {
    repository = new TemplateRepositoryMock();
    saveTemplateUseCase = new SaveTemplateUseCase(repository);
  });

  describe('#Existant template', () => {
    beforeEach(() => {
      // Given a template already exists
      template = TemplateMother.random();
      repository.returnFindById(template);
    });

    it('Should update template if already exists', async () => {
      // const newDes =
      // const newPrev = TemplatePreviewMother.random();
      // const newVar1 = TemplateVariableMother.random();
      // const newVar2 = TemplateVariableMother.random();
      // const newVar3 = TemplateVariableMother.random();
      //  Se crea una copia de la plantilla original para romper la referencia y comprobar que ambas versiones son distintas
      const originalTemplate = TemplateMother.makeCopy(template);
      // template.change(newDes, newPrev, newVar1, newVar2, newVar3);
      originalTemplate.change(
        TemplateShortDescriptionMother.random(),
        TemplatePreviewMother.random(),
        TemplateVariableMother.random(),
        TemplateVariableMother.random(),
        TemplateVariableMother.random()
      );

      const useCaseParams = fillUseCaseParams(template);

      await saveTemplateUseCase.run(useCaseParams);
      expect(repository.mockSave).toHaveBeenCalledWith(template);
    });

    it('Should throw an exception if variables are inconsistent', async () => {
      expect.assertions(2);

      const useCaseParams = fillUseCaseParams(template);
      useCaseParams.variable1 = '';

      try {
        await saveTemplateUseCase.run(useCaseParams);
      } catch (error) {
        expect(error).toBeInstanceOf(InconsistentTemplateVariableError);
      }

      useCaseParams.variable2 = '';

      try {
        await saveTemplateUseCase.run(useCaseParams);
      } catch (error) {
        expect(error).toBeInstanceOf(InconsistentTemplateVariableError);
      }
    });
  });

  describe('#Create new template', () => {
    beforeEach(() => {
      template = TemplateMother.initialState();
    });

    it('Should create a template', async () => {
      const useCaseParams = fillUseCaseParams(template);

      await saveTemplateUseCase.run(useCaseParams);
      expect(repository.mockSave).toHaveBeenCalledWith(template);
    });

    it('Should throw an exception if template with same name exists', async () => {
      //Given a template with same name already exists
      const templateWithSameName = TemplateMother.withName(template.name);
      repository.returnSearchByName(templateWithSameName);

      expect.assertions(1);

      const useCaseParams = fillUseCaseParams(template);
      try {
        await saveTemplateUseCase.run(useCaseParams);
      } catch (error) {
        expect(error).toBeInstanceOf(TemplateWithSameNameAlreadyExistsError);
      }
    });

    it('Should throw an exception if variables are inconsistent', async () => {
      expect.assertions(2);

      const useCaseParams = fillUseCaseParams(template);

      useCaseParams.variable1 = '';

      try {
        await saveTemplateUseCase.run(useCaseParams);
      } catch (error) {
        expect(error).toBeInstanceOf(InconsistentTemplateVariableError);
      }

      useCaseParams.variable2 = '';

      try {
        await saveTemplateUseCase.run(useCaseParams);
      } catch (error) {
        expect(error).toBeInstanceOf(InconsistentTemplateVariableError);
      }
    });
  });
});

const fillUseCaseParams = (template: Template): Params => {
  return {
    accountId: template.accountId.value,
    id: template.id.value,
    name: template.name.value,
    shortDescription: template.shortDescription.value,
    preview: template.preview.value,
    variable1: template.variable1.value,
    variable2: template.variable2.value,
    variable3: template.variable3.value,
  };
};
