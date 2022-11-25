import { AccountPhone as PrismaAccountPhone } from '@prisma/client';
import { injectable } from 'inversify';
import { PrismaRepository } from '../../Shared/infrastructure/PrismaRepository';
import { AccountPhone } from '../domain/AccountPhone';
import { AccountPhoneId } from '../domain/value-object/AccountPhoneId';
import { AccountId } from '../../Account/domain/value-object/AccountId';
import { Nullable } from '../../Shared/domain/Nullable';
import { AccountPhoneRepository } from '../domain/AccountPhoneRepository';
import { AccountPhonePersistenceError } from '../domain/exceptions/AccountPhonePersistenceError';
import { Phone } from '../../Shared/domain/Phone/Phone';
import { AccountPhoneMother } from '../../../../tests/core/AccountPhone/domain/AccountPhoneMother';

@injectable()
export class PrismaAccountPhoneRepository
  extends PrismaRepository<AccountPhone>
  implements AccountPhoneRepository
{
  constructor() {
    super();
  }

  async findById(
    accountId: AccountId,
    id: AccountPhoneId
  ): Promise<Nullable<AccountPhone>> {
    const query = {
      where: {
        accountId_id: {
          accountId: accountId.value,
          id: id.value,
        },
      },
    };

    const prismaAccountPhone = await this.client.accountPhone.findUnique(query);

    if (!prismaAccountPhone) return null;

    return this.mapPrismaEntityToDomainEntity(prismaAccountPhone);
  }

  async findByPhone(
    accountId: AccountId,
    phone: Phone
  ): Promise<Nullable<AccountPhone>> {
    const query = {
      where: {
        accountId: accountId.value,
        prefix: phone.prefix.value,
        number: phone.number.value,
      },
    };

    const prismaAccountPhone = await this.client.accountPhone.findFirst(query);

    if (!prismaAccountPhone) return null;

    return this.mapPrismaEntityToDomainEntity(prismaAccountPhone);
  }

  async searchAll(accountId: AccountId): Promise<Array<AccountPhone>> {
    const query = {
      where: { accountId: accountId.value },
    };
    const prismaAccountPhone = await this.client.accountPhone.findMany(query);
    return prismaAccountPhone.map((prismaAccountPhone) =>
      this.mapPrismaEntityToDomainEntity(prismaAccountPhone)
    );
  }

  async save(accountPhone: AccountPhone): Promise<void> {
    const query = {
      where: {
        accountId_id: {
          accountId: accountPhone.accountId.value,
          id: accountPhone.id.value,
        },
      },
      update: {},
      create: {
        accountId: accountPhone.accountId.value,
        id: accountPhone.id.value,
        prefix: accountPhone.phone.prefix.value,
        number: accountPhone.phone.number.value,
      },
    };
    try {
      await this.client.accountPhone.upsert(query);
    } catch (error) {
      throw new AccountPhonePersistenceError(accountPhone);
    }
  }

  mapPrismaEntityToDomainEntity(
    prismaEntity: PrismaAccountPhone
  ): AccountPhone {
    return AccountPhone.fromPrimitives({
      accountId: prismaEntity.accountId,
      id: prismaEntity.id,
      prefix: prismaEntity.prefix,
      number: prismaEntity.number,
    });
  }
}
