import 'reflect-metadata';

import { Container, injectable, inject } from 'inversify';
import { TemplateRepository } from '../../core/template/domain/TemplateRepository';
import { Template } from '../../core/template/domain/Template';
import { PrismaTemplateRepository } from '../../core/template/infrastructure/PrismaTemplateRespository';
import { TemplateCreator } from '../../core/template/application/TemplateCreator';
import { TemplateFinder } from '../../core/template/application/TemplateFinder';

let container = new Container();

container.bind<TemplateRepository>(PrismaTemplateRepository).toSelf();

// Use cases
container
  .bind<TemplateRepository>(PrismaTemplateRepository)
  .toConstructor<TemplateCreator>(TemplateCreator);
