import { ContainerModule } from 'inversify';
import { SearchAllTemplatesUseCase } from '../../Template/application/SearchAllTemplates';
import { SaveTemplateUseCase } from '../../Template/application/SaveTemplate';
import { SearchAllCategoriesUseCase } from '../../Category/application/SearchAllCategories';
import { SaveCategoryUseCase } from '../../Category/application/SaveCategory';

export const applicationContainerModule = new ContainerModule((bind) => {
  bind<SearchAllTemplatesUseCase>(SearchAllTemplatesUseCase).toSelf();
  bind<SaveTemplateUseCase>(SaveTemplateUseCase).toSelf();

  bind<SearchAllCategoriesUseCase>(SearchAllCategoriesUseCase).toSelf();
  bind<SaveCategoryUseCase>(SaveCategoryUseCase).toSelf();
});
