import { PrismaClient } from '@prisma/client';
import { PrismaClientSingleton } from '../../../../src/core/Shared/infrastructure/PrismaClient';

describe('PrismaClient', () => {
  const client = PrismaClientSingleton.instance;

  it('Should create prisma client instance', () => {
    expect(client).toBeInstanceOf(PrismaClient);
  });

  it('Should connect to the DB successfully', async () => {
    await client.$connect();
  });
});
