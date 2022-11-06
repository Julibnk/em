import { ContainerModule } from 'inversify';
import { SearchAllTemplates } from '../../Template/application/SearchAllTemplates';
import { TemplateCreator } from '../../Template/application/TemplateCreator';

export const applicationContainerModule = new ContainerModule((bind) => {
  bind<SearchAllTemplates>(SearchAllTemplates).toSelf();
  bind<TemplateCreator>(TemplateCreator).toSelf();
});
