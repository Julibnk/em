import { ContainerModule } from 'inversify';
import { Controller } from '../../../apps/controllers/Controller';
import { SearchAllTemplatesController } from '../../../apps/controllers/Template/SearchAllTemplatesController';
import { TemplatePutController } from '../../../apps/controllers/Template/TemplatePutController';
import { CategoryPutController } from '../../../apps/controllers/Category/CategoryPutController';
import { SearchAllCategoriesController } from '../../../apps/controllers/Category/SearchAllCategoriesController';
import { CategoryGetController } from '../../../apps/controllers/Category/CategoryGetController';
import { TemplateGetController } from '../../../apps/controllers/Template/TemplateGetController';
import { ContactPutController } from '../../../apps/controllers/Contact/ContactPutController';
import { SearchAllContactsController } from '../../../apps/controllers/Contact/SearchAllContactsController';

export const enum DiController {
  templatePut = 'app.template.putController',
  templateGet = 'app.template.getController',
  searchAllTemplates = 'app.template.searchAllController',

  categoryPut = 'app.category.putController',
  categoryGet = 'app.category.getController',
  searchAllCategories = 'app.category.searchAllController',

  contactPut = 'app.contact.putController',
  // categoryGet = 'app.category.getController',
  searchAllContacts = 'app.contact.searchAllController',
}

export const templateControllerModule = new ContainerModule((bind) => {
  bind<Controller>(DiController.templatePut).to(TemplatePutController);
  bind<Controller>(DiController.templateGet).to(TemplateGetController);
  bind<Controller>(DiController.searchAllTemplates).to(
    SearchAllTemplatesController
  );
});

export const categoryControllerModule = new ContainerModule((bind) => {
  bind<Controller>(DiController.categoryPut).to(CategoryPutController);
  bind<Controller>(DiController.categoryGet).to(CategoryGetController);
  bind<Controller>(DiController.searchAllCategories).to(
    SearchAllCategoriesController
  );
});
export const contactControllerModule = new ContainerModule((bind) => {
  bind<Controller>(DiController.contactPut).to(ContactPutController);
  // bind<Controller>(DiController.categoryGet).to(CategoryGetController);
  bind<Controller>(DiController.searchAllContacts).to(
    SearchAllContactsController
  );
});
