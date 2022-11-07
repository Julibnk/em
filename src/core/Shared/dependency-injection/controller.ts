import { ContainerModule } from 'inversify';
import { Controller } from '../../../apps/controllers/Controller';
import { TemplatePutController } from '../../../apps/controllers/Template/TemplatePutController';

export const enum DIController {
  templatePut = 'app.template.putController',
}

export const controllerContainerModule = new ContainerModule((bind) => {
  bind<Controller>(DIController.templatePut).to(TemplatePutController);
});
