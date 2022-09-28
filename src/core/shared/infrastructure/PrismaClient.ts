import { PrismaClient } from '@prisma/client';

export class Client {
  private static _instance: PrismaClient;

  static get instance(): PrismaClient {
    if (!Client._instance) {
      Client._instance = new PrismaClient();
    }

    return Client._instance;
  }
}
