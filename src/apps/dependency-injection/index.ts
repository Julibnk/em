import 'reflect-metadata';

import { Container, injectable, inject } from 'inversify';
import { TemplateRepository } from '../../core/template/domain/TemplateRepository';
import { Template } from '../../core/template/domain/Template';
import { PrismaTemplateRepository } from '../../core/template/infrastructure/PrismaTemplateRespository';
import { TemplateCreator } from '../../core/template/application/TemplateCreator';
import { TemplatePutController } from '../controllers/Template/TemplatePutController';
import { Controller } from '../controllers/Controller';

let container = new Container();

container
  .bind<TemplateRepository>('template.repository')
  .to(PrismaTemplateRepository);

container.bind<TemplateCreator>('template.creator').to(TemplateCreator);

container.bind<Controller>('template.putController').to(TemplatePutController);

export { container };
// container
//   .bind<TemplateRepository>(TYPES.TemplateRepository)
//   .to(PrismaTemplateRepository);

// // Use cases
// container
//   .bind<TemplateRepository>(PrismaTemplateRepository)
//   .toConstructor<TemplateCreator>(TemplateCreator);
