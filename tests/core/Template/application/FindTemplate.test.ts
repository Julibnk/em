import { TemplateRepositoryMock } from '../__mocks__/TemplateRepositoryMock';
import { FindTemplateUseCase } from '../../../../src/core/Template/application/FindTemplate';
import { Template } from '../../../../src/core/Template/domain/Template';
import { TemplateMother } from '../domain/TemplateMother';

let repository: TemplateRepositoryMock;
let findCategoryUseCase: FindTemplateUseCase;
let template: Template;

describe('FindTemplate use case', () => {
  beforeEach(() => {
    repository = new TemplateRepositoryMock();
    findCategoryUseCase = new FindTemplateUseCase(repository);
    template = TemplateMother.random();
  });

  it('Repository should be called with account and template id', async () => {
    repository.returnFindById(template);

    await findCategoryUseCase.run(template.accountId.value, template.id.value);

    expect(repository.mockFindById).toHaveBeenCalledWith(
      template.accountId,
      template.id
    );
  });
});
