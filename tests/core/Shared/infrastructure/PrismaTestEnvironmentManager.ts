import {
  InvalidTestEnvironmentError,
  TestEnvironmentManager,
} from '../domain/TestEnvironmentManager';
import { PrismaClient, Prisma } from '@prisma/client';
import { injectable } from 'inversify';
import { PrismaClientSingleton } from '../../../../src/core/Shared/infrastructure/PrismaClient';
import { AccountIdMother } from '../../Account/domain/AccountIdMother';
import { AccountId } from '../../../../src/core/Account/domain/value-object/AccountId';
import { AccountMother } from '../../Account/domain/AccountMother';

@injectable()
export class PrismaTestEnvironmentManager implements TestEnvironmentManager {
  private _client: PrismaClient;

  constructor() {
    this._client = PrismaClientSingleton.instance;
  }

  async start(): Promise<void> {
    this.ensureIsTestEnvironment();
    await this.dropDatabase();
  }

  async createAccount(): Promise<AccountId> {
    const account = AccountMother.random();

    // TODO Por rendimiento se ejecuta el insert directamente en la base de datos
    await this._client.account.create({
      data: {
        id: account.id.value,
        companyName: account.companyName.value,
        vat: account.vat.value,
        street: account.street.value,
        addressNumber: account.addressNumber.value,
        postalCode: account.postalCode.value,
        region: account.region.value,
        country: account.country.value,
        disabled: account.disabled.value,
      },
    });

    return account.id;
  }

  private async dropDatabase(): Promise<void> {
    // const modelNames = PrismaClientSingleton.getPrismaModelNames();

    // No puede ser dinámico por las foreign keys
    const modelNames = [
      'user',
      'contact',
      'category',
      'template',
      'message',
      'accountPhone',
      'dictionary',
      'dictionaryText',
      'metaAccount',
      'account',
    ];

    for (const modelName of modelNames) {
      // console.log(modelName);
      // eslint-disable-next-line
      // @ts-ignore
      await this._client[modelName].deleteMany(); // eslint-disable-line
    }
  }

  ensureIsTestEnvironment(): void {
    if (process.env.NODE_ENV !== 'test') {
      throw new InvalidTestEnvironmentError(process.env.NODE_ENV || '');
    }
  }
}
