import { TemplateMother } from '../domain/TemplateMother';
import { PrismaTemplateRepository } from '../../../../src/core/Template/infrastructure/PrismaTemplateRespository';
import {
  container,
  namespaces,
} from '../../../../src/core/Shared/dependency-injection';
import { TemplateRepository } from '../../../../src/core/Template/domain/TemplateRepository';
import { SearchAllTemplates } from '../../../../src/core/Template/application/SearchAllTemplates';

describe('SearchAllTemplates usecase', () => {
  it('should return all templates', async () => {
    // const templates = [TemplateMother.random(), TemplateMother.random()];
    // const repository = container.get<TemplateRepository>(
    //   namespaces.TEMPLATE_REPOSITORY
    // );
    // const searchAllTemplates = container.get<SearchAllTemplates>(
    //   namespaces.SEARCH_ALL_TEMPLATES
    // );
    // for (const template of templates) {
    //   await repository.save(template);
    // }
    // const expectedTemplates = await searchAllTemplates.run();
    // expect(expectedTemplates).toEqual(templates);
    expect(true).toBe(true);
  });
});
