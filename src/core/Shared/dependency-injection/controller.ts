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
import { AccountPutController } from '../../../apps/controllers/Account/AccountPutController';
import { AccountGetController } from '../../../apps/controllers/Account/AccountGetController';
import { AccountPhoneGetController } from '../../../apps/controllers/AccountPhone/AccountPhoneGetController';
import { AccountPhonePutController } from '../../../apps/controllers/AccountPhone/AccountPhonePutController';

export const enum DiController {
  templatePut = 'app.template.putController',
  templateGet = 'app.template.getController',
  searchAllTemplates = 'app.template.searchAllController',

  categoryPut = 'app.category.putController',
  categoryGet = 'app.category.getController',
  searchAllCategories = 'app.category.searchAllController',

  contactPut = 'app.contact.putController',
  searchAllContacts = 'app.contact.searchAllController',

  accountPhonePut = 'app.accountPhone.putController',
  accountPhoneGet = 'app.accountPhone.getController',

  accountPut = 'app.account.putController',
  accountGet = 'app.account.getController',
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
  bind<Controller>(DiController.searchAllContacts).to(
    SearchAllContactsController
  );
});

export const accountControllerModule = new ContainerModule((bind) => {
  bind<Controller>(DiController.accountPut).to(AccountPutController);
  bind<Controller>(DiController.accountGet).to(AccountGetController);
});

export const accountPhoneControllerModule = new ContainerModule((bind) => {
  bind<Controller>(DiController.accountPhoneGet).to(AccountPhoneGetController);
  bind<Controller>(DiController.accountPhonePut).to(AccountPhonePutController);
});
