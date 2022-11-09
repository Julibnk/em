import { ContainerModule } from 'inversify';
import { SearchAllTemplates } from '../../Template/application/SearchAllTemplates';
import { CreateTemplateUseCase } from '../../Template/application/CreateTemplate';

export const applicationContainerModule = new ContainerModule((bind) => {
  bind<SearchAllTemplates>(SearchAllTemplates).toSelf();
  bind<CreateTemplateUseCase>(CreateTemplateUseCase).toSelf();
});
