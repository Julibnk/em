import { ContainerModule } from 'inversify';
import { SearchAllTemplatesUseCase } from '../../Template/application/SearchAllTemplates';
import { SaveTemplateUseCase } from '../../Template/application/SaveTemplate';
import { SearchAllCategoriesUseCase } from '../../Category/application/SearchAllCategories';
import { SaveCategoryUseCase } from '../../Category/application/SaveCategory';
import { FindTemplateUseCase } from '../../Template/application/FindTemplate';
import { FindCategoryUseCase } from '../../Category/application/FindCategory';
import { SaveContactUseCase } from '../../Contact/application/SaveContact';
import { SearchAllContactsUseCase } from '../../Contact/application/SearchAllContacts';
import { FindAccountUseCase } from '../../Account/application/FindAccount';
import { SaveAccountUseCase } from '../../Account/application/SaveAccount';
import { SaveAccountPhoneUseCase } from '../../AccountPhone/application/SaveAccountPhone';
import { FindAccountPhoneUseCase } from '../../AccountPhone/application/FindAccountPhone';
import { SaveTemplateMessageUseCase } from '../../TemplateMessage/application/SaveTemplateMessage';
import { FindTemplateMessageUseCase } from '../../TemplateMessage/application/FindTemplateMessage';

export const templateUseCasesModule = new ContainerModule((bind) => {
  bind<SearchAllTemplatesUseCase>(SearchAllTemplatesUseCase).toSelf();
  bind<FindTemplateUseCase>(FindTemplateUseCase).toSelf();
  bind<SaveTemplateUseCase>(SaveTemplateUseCase).toSelf();
});

export const categoryUseCasesModule = new ContainerModule((bind) => {
  bind<SearchAllCategoriesUseCase>(SearchAllCategoriesUseCase).toSelf();
  bind<FindCategoryUseCase>(FindCategoryUseCase).toSelf();
  bind<SaveCategoryUseCase>(SaveCategoryUseCase).toSelf();
});

export const contactUseCasesModule = new ContainerModule((bind) => {
  bind<SearchAllContactsUseCase>(SearchAllContactsUseCase).toSelf();
  bind<SaveContactUseCase>(SaveContactUseCase).toSelf();
});

export const accountUseCasesModule = new ContainerModule((bind) => {
  bind<FindAccountUseCase>(FindAccountUseCase).toSelf();
  bind<SaveAccountUseCase>(SaveAccountUseCase).toSelf();
});

export const accountPhoneUseCasesModule = new ContainerModule((bind) => {
  bind<SaveAccountPhoneUseCase>(SaveAccountPhoneUseCase).toSelf();
  bind<FindAccountPhoneUseCase>(FindAccountPhoneUseCase).toSelf();
});

export const templateMessageUseCasesModule = new ContainerModule((bind) => {
  bind<SaveTemplateMessageUseCase>(SaveTemplateMessageUseCase).toSelf();
  bind<FindTemplateMessageUseCase>(FindTemplateMessageUseCase).toSelf();
});
