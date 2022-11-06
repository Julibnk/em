import { PrismaClient } from '@prisma/client';
import { AggregateRoot } from '../domain/AggregateRoot';
import { PrismaClientSingleton } from './PrismaClient';

export abstract class PrismaRepository<T> {
  protected client: PrismaClient;

  constructor() {
    this.client = PrismaClientSingleton.instance;
  }

  abstract mapPrismaEntityToDomainEntity(prismaEntity: T): AggregateRoot;
}
