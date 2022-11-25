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
} from './controller';

import {
  accountPhoneUseCasesModule,
  accountUseCasesModule,
  categoryUseCasesModule,
  contactUseCasesModule,
  templateUseCasesModule,
} from './application';

const container = new Container();

container.load(
  testManagerModule,
  domainContainerModule,
  categoryControllerModule,
  contactControllerModule,
  templateControllerModule,
  categoryUseCasesModule,
  contactUseCasesModule,
  templateUseCasesModule,
  accountUseCasesModule,
  accountPhoneUseCasesModule,
  accountControllerModule,
  accountPhoneControllerModule
);

export { container, DiDomain, DiRepository, DiController };
