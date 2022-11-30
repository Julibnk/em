import { SaveTemplateUseCase } from '../../../../src/core/Template/application/SaveTemplate';
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

  describe('=> Update template', () => {
    beforeEach(() => {
      // Given a template already exists
      template = TemplateMother.random();
    });

    it('Should update template if already exists', async () => {
      //  Se crea una copia de la plantilla original para romper la referencia y comprobar que ambas versiones son distintas
      repository.returnFindById(template);

      const originalTemplate = TemplateMother.makeCopy(template);
      const changedTemplate = TemplateMother.makeCopy(template);

      changedTemplate.change(
        TemplateShortDescriptionMother.random(),
        TemplatePreviewMother.random(),
        TemplateVariableMother.random(),
        TemplateVariableMother.random(),
        TemplateVariableMother.random()
      );

      const useCaseParams = { ...changedTemplate.toPrimitives() };

      await saveTemplateUseCase.run(useCaseParams);
      expect(repository.mockSave).toHaveBeenCalledWith(changedTemplate);
      expect(repository.mockSave).not.toHaveBeenCalledWith(originalTemplate);

      template.change = jest.fn();
      await saveTemplateUseCase.run(useCaseParams);
      expect(template.change).toHaveBeenCalledWith(
        changedTemplate.shortDescription,
        changedTemplate.preview,
        changedTemplate.variable1,
        changedTemplate.variable2,
        changedTemplate.variable3
      );
    });

    it('Should throw an exception if variables are inconsistent', async () => {
      repository.returnFindById(template);

      const useCaseParams = { ...template.toPrimitives() };
      useCaseParams.variable1 = '';

      expect(
        async () => await saveTemplateUseCase.run(useCaseParams)
      ).rejects.toThrow(InconsistentTemplateVariableError);

      useCaseParams.variable2 = '';

      expect(
        async () => await saveTemplateUseCase.run(useCaseParams)
      ).rejects.toThrow(InconsistentTemplateVariableError);
    });
  });

  describe('=> Create template', () => {
    beforeEach(() => {
      template = TemplateMother.initialState();
    });

    it('Should create a template', async () => {
      const useCaseParams = { ...template.toPrimitives() };

      await saveTemplateUseCase.run(useCaseParams);
      expect(repository.mockSave).toHaveBeenCalledWith(template);
    });

    it('Should throw an exception if template with same name exists', async () => {
      //Given a template with same name already exists
      // const templateWithSameName = TemplateMother.withName(template.name);
      repository.returnFindByName(template);

      const useCaseParams = { ...template.toPrimitives() };

      expect(
        async () => await saveTemplateUseCase.run(useCaseParams)
      ).rejects.toThrow(TemplateWithSameNameAlreadyExistsError);
    });

    it('Should throw an exception if variables are inconsistent', async () => {
      const useCaseParams = { ...template.toPrimitives() };

      useCaseParams.variable1 = '';

      expect(
        async () => await saveTemplateUseCase.run(useCaseParams)
      ).rejects.toThrow(InconsistentTemplateVariableError);

      useCaseParams.variable2 = '';

      expect(
        async () => await saveTemplateUseCase.run(useCaseParams)
      ).rejects.toThrow(InconsistentTemplateVariableError);
    });
  });
});
