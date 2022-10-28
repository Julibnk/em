import { PrismaClient } from '@prisma/client';
import { PrismaClientSingleton } from '../../src/core/Shared/infrastructure/PrismaClient';

describe('PrismaClient', () => {
  it('Should create prisma client instance', () => {
    const client = PrismaClientSingleton.instance;
    expect(client).toBeInstanceOf(PrismaClient);
  });
});
