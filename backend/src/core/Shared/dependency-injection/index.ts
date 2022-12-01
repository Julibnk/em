import 'reflect-metadata';

import { Container } from 'inversify';

import {
  DiDomain,
  DiRepository,
  domainContainerModule,
  testManagerModule,
} from './domain';

import {
  DiController,
  categoryControllerModule,
  contactControllerModule,
  templateControllerModule,
  accountControllerModule,
  accountPhoneControllerModule,
  templateMessageControllerModule,
} from './controller';

import {
  accountPhoneUseCasesModule,
  accountUseCasesModule,
  categoryUseCasesModule,
  contactUseCasesModule,
  templateMessageUseCasesModule,
  templateUseCasesModule,
} from './application';

const container = new Container();

// domain
container.load(testManagerModule, domainContainerModule);

// Use cases
container.load(
  accountUseCasesModule,
  accountPhoneUseCasesModule,
  categoryUseCasesModule,
  contactUseCasesModule,
  templateUseCasesModule,
  templateMessageUseCasesModule
);

// Controllers
container.load(
  categoryControllerModule,
  contactControllerModule,
  templateControllerModule,
  accountControllerModule,
  accountPhoneControllerModule,
  templateMessageControllerModule
);

export { container, DiDomain, DiRepository, DiController };
