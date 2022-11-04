import { PrismaClient } from '@prisma/client';
import { PrismaClientSingleton } from './PrismaClient';

export class PrismaRepository {
  protected client: PrismaClient;

  constructor() {
    this.client = PrismaClientSingleton.instance;
  }
}
