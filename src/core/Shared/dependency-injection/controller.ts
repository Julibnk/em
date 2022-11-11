import { ContainerModule } from 'inversify';
import { Controller } from '../../../apps/controllers/Controller';
import { SearchAllTemplatesController } from '../../../apps/controllers/Template/SearchAllTemplatesController';
import { TemplatePutController } from '../../../apps/controllers/Template/TemplatePutController';

export const enum DIController {
  templatePut = 'app.template.putController',
  searchAllTemplates = 'app.template.searchAllController',
}

export const controllerContainerModule = new ContainerModule((bind) => {
  bind<Controller>(DIController.templatePut).to(TemplatePutController);
  bind<Controller>(DIController.searchAllTemplates).to(
    SearchAllTemplatesController
  );
});
