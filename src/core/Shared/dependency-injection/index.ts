import 'reflect-metadata';

import { Container } from 'inversify';
import { TemplateRepository } from '../../Template/domain/TemplateRepository';
import { PrismaTemplateRepository } from '../../Template/infrastructure/PrismaTemplateRespository';
import { TemplateCreator } from '../../Template/application/TemplateCreator';
import { TemplatePutController } from '../../../apps/controllers/Template/TemplatePutController';
import { Controller } from '../../../apps/controllers/Controller';
import { namespaces } from './namespaces';
import { SearchAllTemplates } from '../../Template/application/SearchAllTemplates';

const container = new Container();

container
  .bind<TemplateRepository>(namespaces.TEMPLATE_REPOSITORY)
  .to(PrismaTemplateRepository);

container
  .bind<TemplateCreator>(namespaces.TEMPLATE_CREATOR)
  .to(TemplateCreator);

container
  .bind<SearchAllTemplates>(namespaces.SEARCH_ALL_TEMPLATES)
  .to(SearchAllTemplates);

container
  .bind<Controller>(namespaces.TEMPLATE_PUT_CONTROLLER)
  .to(TemplatePutController);

export { container, namespaces };
