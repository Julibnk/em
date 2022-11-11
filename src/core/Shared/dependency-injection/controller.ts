import { ContainerModule } from 'inversify';
import { Controller } from '../../../apps/controllers/Controller';
import { SearchAllTemplatesController } from '../../../apps/controllers/Template/SearchAllTemplatesController';
import { TemplatePutController } from '../../../apps/controllers/Template/TemplatePutController';
import { CategoryPutController } from '../../../apps/controllers/Category/CategoryPutController';
import { SearchAllCategoriesController } from '../../../apps/controllers/Category/SearchAllCategoriesController';

export const enum DIController {
  templatePut = 'app.template.putController',
  searchAllTemplates = 'app.template.searchAllController',

  categoryPut = 'app.category.putController',
  searchAllCategories = 'app.category.searchAllController',
}

export const controllerContainerModule = new ContainerModule((bind) => {
  bind<Controller>(DIController.templatePut).to(TemplatePutController);
  bind<Controller>(DIController.searchAllTemplates).to(
    SearchAllTemplatesController
  );

  bind<Controller>(DIController.categoryPut).to(CategoryPutController);
  bind<Controller>(DIController.searchAllCategories).to(
    SearchAllCategoriesController
  );
});
