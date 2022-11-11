import 'reflect-metadata';

import { Container } from 'inversify';

import { DIDomain, repositoryContainerModule } from './domain';
import { DIController, controllerContainerModule } from './controller';
import { applicationContainerModule } from './application';

const container = new Container();

container.load(
  repositoryContainerModule,
  controllerContainerModule,
  applicationContainerModule
);

export { container, DIDomain, DIController };
