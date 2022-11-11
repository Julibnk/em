import 'reflect-metadata';

import { Container } from 'inversify';

import { DIDomain, domainContainerModule } from './domain';
import { DIController, controllerContainerModule } from './controller';
import { applicationContainerModule } from './application';

const container = new Container();

container.load(
  domainContainerModule,
  controllerContainerModule,
  applicationContainerModule
);

export { container, DIDomain, DIController };
