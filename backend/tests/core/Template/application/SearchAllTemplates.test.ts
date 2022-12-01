import { SearchAllTemplatesUseCase } from '../../../../src/core/Template/application/SearchAllTemplates';
import { TemplateRepositoryMock } from '../__mocks__/TemplateRepositoryMock';
import { TemplateMother } from '../domain/TemplateMother';
import { AccountIdMother } from '../../Account/domain/AccountIdMother';

let repository: TemplateRepositoryMock;
let searchAllTemplatesUseCase: SearchAllTemplatesUseCase;

describe('SearchAllTemplates use case', () => {
  beforeEach(() => {
    repository = new TemplateRepositoryMock();
    searchAllTemplatesUseCase = new SearchAllTemplatesUseCase(repository);
  });

  it('Should return all templates', async () => {
    const accountId = AccountIdMother.random();
    const templates = [
      TemplateMother.withAccount(accountId),
      TemplateMother.withAccount(accountId),
      TemplateMother.withAccount(accountId),
    ];

    repository.returnSearchAll(templates);

    const expectedTemplates = await searchAllTemplatesUseCase.run(
      accountId.value
    );

    expect(repository.mockSearchAll).toHaveBeenCalledWith(accountId);
    expect(expectedTemplates).toEqual(templates);
  });
});
