import { TemplateRepositoryMock } from '../__mocks__/TemplateRepositoryMock';
import { FindTemplateUseCase } from '../../../../src/core/Template/application/FindTemplate';
import { Template } from '../../../../src/core/Template/domain/Template';
import { TemplateMother } from '../domain/TemplateMother';
import { TemplateNotFoundError } from '../../../../src/core/Template/domain/exceptions/TemplateNotFoundError';

let repository: TemplateRepositoryMock;
let findTemplateUseCase: FindTemplateUseCase;
let template: Template;

describe('FindTemplate use case', () => {
  beforeEach(() => {
    repository = new TemplateRepositoryMock();
    findTemplateUseCase = new FindTemplateUseCase(repository);
    template = TemplateMother.random();
  });

  it('Repository should be called with account and template id', async () => {
    repository.returnFindById(template);

    await findTemplateUseCase.run(template.accountId.value, template.id.value);

    expect(repository.mockFindById).toHaveBeenCalledWith(
      template.accountId,
      template.id
    );
  });

  it('Should throw exception when template doesnt exists', async () => {
    expect(
      async () =>
        await findTemplateUseCase.run(
          template.accountId.value,
          template.id.value
        )
    ).rejects.toThrow(TemplateNotFoundError);
  });
});
