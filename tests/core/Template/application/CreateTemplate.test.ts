import { CreateTemplateUseCase } from '../../../../src/core/Template/application/CreateTemplate';
import { TemplateMother } from '../domain/TemplateMother';
import { TemplateRepositoryMock } from '../__mocks__/TemplateRepositoryMock';
import { TemplateWithSameNameAlreadyExistsError } from '../../../../src/core/Template/domain/exceptions/TemplateWithSameNameAlreadyExistsError';
import { TemplateShortDescriptionMother } from '../domain/TemplateShortDescriptionMother';
import { TemplateVariableMother } from '../domain/TemplateVariableMother';
import { TemplatePreviewMother } from '../domain/TemplatePreviewMother';

let repository: TemplateRepositoryMock;
let createTemplateUseCase: CreateTemplateUseCase;

describe('CreateTemplate use case', () => {
  beforeEach(() => {
    repository = new TemplateRepositoryMock();
    createTemplateUseCase = new CreateTemplateUseCase(repository);
  });

  it('Should create a template', async () => {
    const template = TemplateMother.forCreation();

    const useCaseParams = {
      accountId: template.accountId.value,
      id: template.id.value,
      name: template.name.value,
      shortDescription: template.shortDescription.value,
      preview: template.preview.value,
      variable1: template.variable1.value,
      variable2: template.variable2.value,
      variable3: template.variable3.value,
    };
    await createTemplateUseCase.run(useCaseParams);
    repository.assertSaveHasBeenCalledWith(template);
  });

  it('Should throw an exception if template with same name exists', async () => {
    const template = TemplateMother.forCreation();
    repository.setMockSearchByName(template);

    const useCaseParams = {
      accountId: template.accountId.value,
      id: template.id.value,
      name: template.name.value,
      shortDescription: template.shortDescription.value,
      preview: template.preview.value,
      variable1: template.variable1.value,
      variable2: template.variable2.value,
      variable3: template.variable3.value,
    };

    try {
      await createTemplateUseCase.run(useCaseParams);
    } catch (error) {
      expect(error).toBeInstanceOf(TemplateWithSameNameAlreadyExistsError);
    }
  });

  it('Should update template if already exists', async () => {
    const template = TemplateMother.forCreation();
    repository.setMockFindById(template);

    //  Se crea una copia de la plantilla original para romper la referencia y comprobar que ambas versiones son distintas
    const originalTemplate = TemplateMother.makeCopy(template);

    template.change(
      TemplateShortDescriptionMother.random(),
      TemplatePreviewMother.random(),
      TemplateVariableMother.random(),
      TemplateVariableMother.random(),
      TemplateVariableMother.random()
    );

    await createTemplateUseCase.run({
      accountId: template.accountId.value,
      id: template.id.value,
      name: template.name.value,
      shortDescription: template.shortDescription.value,
      preview: template.preview.value,
      variable1: template.variable1.value,
      variable2: template.variable2.value,
      variable3: template.variable3.value,
    });

    repository.assertSaveHasBeenCalledWith(template);
    repository.assertSaveHasNotBeenCalledWith(originalTemplate);
  });
});
