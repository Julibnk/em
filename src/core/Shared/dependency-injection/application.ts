import { ContainerModule } from 'inversify';
import { SearchAllTemplates } from '../../Template/application/SearchAllTemplates';
import { TemplateCreator } from '../../Template/application/TemplateCreator';

export const enum DIApplication {
  searchAllTemplates = 'core.application.searchAllTemplates',
  templateCreator = 'core.application.tempalteCreator',
}

export const applicationContainerModule = new ContainerModule((bind) => {
  bind<SearchAllTemplates>(DIApplication.searchAllTemplates).toSelf();
  bind<TemplateCreator>(DIApplication.templateCreator).toSelf();

  // bind<AccountRepository>(DIRepository.account).to(PrismaAccountRepository);
});
