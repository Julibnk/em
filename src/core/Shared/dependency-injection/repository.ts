import { ContainerModule } from 'inversify';
import { AccountRepository } from '../../Account/domain/AccountRepository';
import { PrismaAccountRepository } from '../../Account/infrastructure/PrismaAccountRepository';
import { TemplateRepository } from '../../Template/domain/TemplateRepository';
import { PrismaTemplateRepository } from '../../Template/infrastructure/PrismaTemplateRespository';
import { PrismaTestEnvironmentManager } from '../../../../tests/core/Shared/infrastructure/PrismaTestEnvironmentManager';
import { TestEnvironmentManager } from '../../../../tests/core/Shared/domain/TestEnvironmentManager';

export const enum DIRepository {
  template = 'core.template.repository',
  account = 'core.account.repository',

  environmentManager = 'core.enviromentManager',
}

export const repositoryContainerModule = new ContainerModule((bind) => {
  bind<TemplateRepository>(DIRepository.template).to(PrismaTemplateRepository);
  bind<AccountRepository>(DIRepository.account).to(PrismaAccountRepository);
  bind<TestEnvironmentManager>(DIRepository.environmentManager).to(
    PrismaTestEnvironmentManager
  );
});
