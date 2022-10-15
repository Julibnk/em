import 'reflect-metadata';

import { Container } from 'inversify';
import { TemplateRepository } from '../../Template/domain/TemplateRepository';
import { PrismaTemplateRepository } from '../../Template/infrastructure/PrismaTemplateRespository';
import { TemplateCreator } from '../../Template/application/TemplateCreator';
import { TemplatePutController } from '../../../apps/controllers/Template/TemplatePutController';
import { Controller } from '../../../apps/controllers/Controller';
import { DI_NAMESPACES } from './namespaces';

// import * as namespaces from './namespaces';

const container = new Container();

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
