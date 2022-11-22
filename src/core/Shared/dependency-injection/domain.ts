import { ContainerModule } from 'inversify';
import { AccountRepository } from '../../Account/domain/AccountRepository';
import { PrismaAccountRepository } from '../../Account/infrastructure/PrismaAccountRepository';
import { TemplateRepository } from '../../Template/domain/TemplateRepository';
import { PrismaTemplateRepository } from '../../Template/infrastructure/PrismaTemplateRespository';
import { PrismaTestEnvironmentManager } from '../../../../tests/core/Shared/infrastructure/PrismaTestEnvironmentManager';
import { TestEnvironmentManager } from '../../../../tests/core/Shared/infrastructure/TestEnvironmentManager';
import { CategoryRepository } from '../../Category/domain/CategoryRepository';
import { PrismaCategoryRepository } from '../../Category/infrastructure/PrismaCategoryRepository';
import WinstonLogger from '../infrastructure/WinstonLogger';
import Logger from '../domain/Logger';
import { PrismaContactRepository } from '../../Contact/infrastructure/PrismaContactRepository';
import { ContactRepository } from '../../Contact/domain/ContactRepository';

export const enum DIDomain {
  account = 'core.account.repository',
  accountPhone = 'core.accountPhone.repository',
  category = 'core.category.repository',
  contact = 'core.contact.repository',
  template = 'core.template.repository',
  message = 'core.message.repository',
  user = 'core.user.repository',

  environmentManager = 'core.enviromentManager',
  logger = 'core.logger',
}

export const domainContainerModule = new ContainerModule((bind) => {
  bind<AccountRepository>(DIDomain.account).to(PrismaAccountRepository);
  bind<TemplateRepository>(DIDomain.template).to(PrismaTemplateRepository);
  bind<CategoryRepository>(DIDomain.category).to(PrismaCategoryRepository);
  bind<ContactRepository>(DIDomain.contact).to(PrismaContactRepository);

  bind<TestEnvironmentManager>(DIDomain.environmentManager).to(
    PrismaTestEnvironmentManager
  );

  bind<Logger>(DIDomain.logger).to(WinstonLogger);
});
