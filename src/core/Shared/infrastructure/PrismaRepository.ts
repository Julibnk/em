import { PrismaClient } from '@prisma/client';
import { injectable } from 'inversify';
import { AggregateRoot } from '../domain/AggregateRoot';
import { PrismaClientSingleton } from './PrismaClient';

@injectable()
export abstract class PrismaRepository<T extends AggregateRoot> {
  protected client: PrismaClient;

  constructor() {
    this.client = PrismaClientSingleton.instance;
  }

  abstract mapPrismaEntityToDomainEntity(prismaEntity: unknown): T;
}
