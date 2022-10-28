import { PrismaClient } from '@prisma/client';

declare global {
  var client: PrismaClient; // eslint-disable-line no-var
}

export class PrismaClientSingleton {
  private static client: PrismaClient;

  static get instance(): PrismaClient {
    if (!PrismaClientSingleton.client) {
      PrismaClientSingleton.client = global.client || new PrismaClient();
    }

    // In development the client is saved in glonal variable to prevent multiple instances beacuse of hot reloading
    if (process.env.NODE_ENV === 'development') {
      global.client = PrismaClientSingleton.client;
    }

    return PrismaClientSingleton.client;
  }
}
