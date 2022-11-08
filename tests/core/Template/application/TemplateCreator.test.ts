import { TemplateCreator } from '../../../../src/core/Template/application/TemplateCreator';
import { TemplateMother } from '../domain/TemplateMother';
import { TemplateRepositoryMock } from '../__mocks__/TemplateRepositoryMock';
import { TemplateWithSameNameAlreadyExistsError } from '../../../../src/core/Template/domain/exceptions/TemplateWithSameNameAlreadyExistsError';

let repository: TemplateRepositoryMock;
let templateCreatorUseCase: TemplateCreator;

describe('CreateTemplate useCase', () => {
  beforeEach(() => {
    repository = new TemplateRepositoryMock();
    templateCreatorUseCase = new TemplateCreator(repository);
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
    await templateCreatorUseCase.run(useCaseParams);
    repository.assertSaveHasBeenCalledWith(template);
  });

  it('Should throw an exception if template with same name exists', async () => {
    expect.assertions(1);

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
      await templateCreatorUseCase.run(useCaseParams);
    } catch (error) {
      expect(error).toBeInstanceOf(TemplateWithSameNameAlreadyExistsError);
    }
  });
});
