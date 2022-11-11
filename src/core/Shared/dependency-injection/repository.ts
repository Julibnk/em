import { ContainerModule } from 'inversify';
import { AccountRepository } from '../../Account/domain/AccountRepository';
import { PrismaAccountRepository } from '../../Account/infrastructure/PrismaAccountRepository';
import { TemplateRepository } from '../../Template/domain/TemplateRepository';
import { PrismaTemplateRepository } from '../../Template/infrastructure/PrismaTemplateRespository';
import { PrismaTestEnvironmentManager } from '../../../../tests/core/Shared/infrastructure/PrismaTestEnvironmentManager';
import { TestEnvironmentManager } from '../../../../tests/core/Shared/infrastructure/TestEnvironmentManager';
import { CategoryRepository } from '../../Category/domain/CategoryRepository';
import { PrismaCategoryRepository } from '../../Category/infrastructure/PrismaCategoryRepository';

export const enum DIRepository {
  account = 'core.account.repository',
  accountPhone = 'core.accountPhone.repository',
  category = 'core.category.repository',
  contact = 'core.contact.repository',
  template = 'core.template.repository',
  message = 'core.message.repository',
  user = 'core.user.repository',

  environmentManager = 'core.enviromentManager',
}

export const repositoryContainerModule = new ContainerModule((bind) => {
  bind<AccountRepository>(DIRepository.account).to(PrismaAccountRepository);
  bind<TemplateRepository>(DIRepository.template).to(PrismaTemplateRepository);
  bind<CategoryRepository>(DIRepository.category).to(PrismaCategoryRepository);

  bind<TestEnvironmentManager>(DIRepository.environmentManager).to(
    PrismaTestEnvironmentManager
  );
});
