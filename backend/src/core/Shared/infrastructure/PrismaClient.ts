import { Prisma, PrismaClient } from '@prisma/client';

declare global {
  var globalPrismaClient: PrismaClient; // eslint-disable-line no-var
}

export class PrismaClientSingleton {
  private static client: PrismaClient;

  static get instance(): PrismaClient {
    if (!this.client) {
      this.client = global.globalPrismaClient || new PrismaClient();
    }

    // In development the client is saved in glonal variable to prevent multiple instances because of hot reloading
    if (process.env.NODE_ENV === 'development') {
      global.globalPrismaClient = this.client;
    }

    return this.client;
  }

  static getPrismaModelNames(): string[] {
    const modelNames = Prisma.dmmf.datamodel.models.map((model) =>
      this._toCamelCase(model.name)
    );
    return modelNames;
  }

  private static _toCamelCase(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }
}
