import 'reflect-metadata';

import { Container } from 'inversify';

import { DIRepository, repositoryContainerModule } from './repository';
import { DIController, controllerContainerModule } from './controller';
import { DIApplication, applicationContainerModule } from './application';

const container = new Container();

container.load(
  repositoryContainerModule,
  controllerContainerModule,
  applicationContainerModule
);

export { container, DIRepository, DIController, DIApplication };
