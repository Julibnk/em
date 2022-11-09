import { SearchAllTemplates } from '../../../../src/core/Template/application/SearchAllTemplates';
import { TemplateRepositoryMock } from '../__mocks__/TemplateRepositoryMock';
import { TemplateMother } from '../domain/TemplateMother';
import { AccountIdMother } from '../../Account/domain/AccountIdMother';

let repository: TemplateRepositoryMock;
let searchAllTemplatesUseCase: SearchAllTemplates;

describe('SearchAllTemplates use case', () => {
  beforeEach(() => {
    repository = new TemplateRepositoryMock();
    searchAllTemplatesUseCase = new SearchAllTemplates(repository);
  });

  it('Should return all templates', async () => {
    const accountId = AccountIdMother.random();
    const templates = [
      TemplateMother.random(accountId),
      TemplateMother.random(accountId),
      TemplateMother.random(accountId),
    ];

    repository.setMockSearchAll(templates);

    const expected = await searchAllTemplatesUseCase.run(accountId.value);

    repository.assertSearchAllHasBeenCalledWith(accountId);
    expect(expected).toEqual(templates);
  });
});
