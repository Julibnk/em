import 'reflect-metadata';

import { Container } from 'inversify';

import { DiDomain, DiRepository, domainContainerModule } from './domain';
import {
  DiController,
  categoryControllerModule,
  contactControllerModule,
  templateControllerModule,
} from './controller';

import {
  categoryUseCasesModule,
  contactUseCasesModule,
  templateUseCasesModule,
} from './application';

const container = new Container();

container.load(
  domainContainerModule,
  categoryControllerModule,
  contactControllerModule,
  templateControllerModule,
  categoryUseCasesModule,
  contactUseCasesModule,
  templateUseCasesModule
);

export { container, DiDomain, DiRepository, DiController };
