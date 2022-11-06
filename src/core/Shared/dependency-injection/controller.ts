import { ContainerModule } from 'inversify';
import { Controller } from '../../../apps/controllers/Controller';
import { TemplatePutController } from '../../../apps/controllers/Template/TemplatePutController';
import { AccountRepository } from '../../Account/domain/AccountRepository';
import { PrismaAccountRepository } from '../../Account/infrastructure/PrismaAccountRepository';
import { TemplateRepository } from '../../Template/domain/TemplateRepository';
import { PrismaTemplateRepository } from '../../Template/infrastructure/PrismaTemplateRespository';

export const enum DIController {
  templatePut = 'app.template.putController',
}

export const controllerContainerModule = new ContainerModule((bind) => {
  bind<Controller>(DIController.templatePut).to(TemplatePutController);
});
