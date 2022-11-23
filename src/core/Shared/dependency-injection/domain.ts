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

export const enum DiRepository {
  account = 'core.account.repository',
  accountPhone = 'core.accountPhone.repository',
  category = 'core.category.repository',
  contact = 'core.contact.repository',
  template = 'core.template.repository',
  message = 'core.message.repository',
  user = 'core.user.repository',
}

export const enum DiDomain {
  environmentManager = 'core.enviromentManager',
  logger = 'core.logger',
}

export const domainContainerModule = new ContainerModule((bind) => {
  bind<AccountRepository>(DiRepository.account).to(PrismaAccountRepository);
  bind<TemplateRepository>(DiRepository.template).to(PrismaTemplateRepository);
  bind<CategoryRepository>(DiRepository.category).to(PrismaCategoryRepository);
  bind<ContactRepository>(DiRepository.contact).to(PrismaContactRepository);

  bind<TestEnvironmentManager>(DiDomain.environmentManager).to(
    PrismaTestEnvironmentManager
  );

  bind<Logger>(DiDomain.logger).to(WinstonLogger);
});
