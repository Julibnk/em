import 'reflect-metadata';

import { Container, injectable, inject } from 'inversify';
import { TemplateRepository } from '../../template/domain/TemplateRepository';
import { PrismaTemplateRepository } from '../../template/infrastructure/PrismaTemplateRespository';
import { TemplateCreator } from '../../template/application/TemplateCreator';
import { TemplatePutController } from '../../../apps/controllers/Template/TemplatePutController';
import { Controller } from '../../../apps/controllers/Controller';
import { DI_NAMESPACES } from './namespaces';

// import * as namespaces from './namespaces';

let container = new Container();

container
  .bind<TemplateRepository>(DI_NAMESPACES.TEMPLATE_REPOSITORY)
  .to(PrismaTemplateRepository);

container
  .bind<TemplateCreator>(DI_NAMESPACES.TEMPLATE_CREATOR)
  .to(TemplateCreator);

container
  .bind<Controller>(DI_NAMESPACES.TEMPLATE_PUT_CONTROLLER)
  .to(TemplatePutController);

export { container };
