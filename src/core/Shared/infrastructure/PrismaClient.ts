import { PrismaClient } from '@prisma/client';

export class PrismaClientSingleton {
  private static client: PrismaClient;

  static get instance(): PrismaClient {
    if (!PrismaClientSingleton.client) {
      PrismaClientSingleton.client = new PrismaClient();
    }

    return PrismaClientSingleton.client;
  }
}
