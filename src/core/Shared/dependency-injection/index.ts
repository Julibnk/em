import 'reflect-metadata';

import { Container } from 'inversify';

import { DiDomain, DiRepository, domainContainerModule } from './domain';
import { DiController, controllerContainerModule } from './controller';
import { applicationContainerModule } from './application';

const container = new Container();

container.load(
  domainContainerModule,
  controllerContainerModule,
  applicationContainerModule
);

export { container, DiDomain, DiRepository, DiController };
