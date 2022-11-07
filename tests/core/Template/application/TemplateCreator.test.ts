import { TemplateCreator } from '../../../../src/core/Template/application/TemplateCreator';
import { TemplateMother } from '../domain/TemplateMother';
import { TemplateRepositoryMock } from '../__mocks__/TemplateRepositoryMock';
import { TemplateWithSameNameAlreadyExistsError } from '../../../../src/core/Template/domain/exceptions/TemplateWithSameNameAlreadyExistsError';

describe('CreateTemplate useCase', () => {
  it('Should create a template', () => {
    const template = TemplateMother.random();

    const repository = new TemplateRepositoryMock();
    const templateCreatorUseCase = new TemplateCreator(repository);

    templateCreatorUseCase.run({
      accountId: template.accountId.value,
      id: template.id.value,
      name: template.name.value,
      shortDescription: template.shortDescription.value,
      preview: template.preview.value,
      variable1: template.variable1.value,
      variable2: template.variable2.value,
      variable3: template.variable3.value,
    });

    expect(repository.save).toBeCalledWith(template);
  });

  it('Should throw an exception if template with same name exists', () => {
    expect.assertions(1);

    const template = TemplateMother.random();
    const repository = new TemplateRepositoryMock();

    repository.setMockSearchByName(template);

    const templateCreatorUseCase = new TemplateCreator(repository);

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

    expect(() => templateCreatorUseCase.run(useCaseParams)).toThrowError(
      TemplateWithSameNameAlreadyExistsError
    );
  });
});
