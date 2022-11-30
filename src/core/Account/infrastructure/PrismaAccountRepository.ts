import { AccountRepository } from '../domain/AccountRepository';
import { PrismaRepository } from '../../Shared/infrastructure/PrismaRepository';
import { Account } from '../domain/Account';
import { AccountId } from '../domain/value-object/AccountId';

import {
  Account as PrismaAccount,
  MetaAccount as PrismaMetaAccount,
} from '@prisma/client';
import { injectable } from 'inversify';
import { Nullable } from '../../Shared/domain/Nullable';
import { AccountPersistenceError } from '../domain/exceptions/AccountPersistenceError';

type PrismaAccountWithMetaAccount = PrismaAccount & {
  MetaAccount: PrismaMetaAccount;
};
@injectable()
export class PrismaAccountRepository
  extends PrismaRepository<Account>
  implements AccountRepository
{
  async save(account: Account): Promise<void> {
    const query = {
      where: {
        id: account.id.value,
      },
      update: {
        vat: account.vat.value,
        street: account.address.street.value,
        addressNumber: account.address.addressNumber.value,
        postalCode: account.address.postalCode.value,
        region: account.address.region.value,
        country: account.address.country.value,
        disabled: account.disabled.value,
        MetaAccount: {
          update: {},
        },
      },
      create: {
        id: account.id.value,
        companyName: account.companyName.value,
        vat: account.vat.value,
        street: account.address.street.value,
        addressNumber: account.address.addressNumber.value,
        postalCode: account.address.postalCode.value,
        region: account.address.region.value,
        country: account.address.country.value,
        disabled: account.disabled.value,
        MetaAccount: {
          create: { id: account.metaAccount.id.value },
        },
      },
    };

    try {
      await this.client.account.upsert(query);
    } catch (error) {
      throw new AccountPersistenceError(account);
    }
  }

  async findById(id: AccountId): Promise<Nullable<Account>> {
    const prismaAccount = await this.client.account.findUnique({
      where: {
        id: id.value,
      },
      include: {
        MetaAccount: true,
      },
    });

    if (!prismaAccount) {
      return null;
    }

    return this.mapPrismaEntityToDomainEntity(prismaAccount);
  }

  mapPrismaEntityToDomainEntity(
    prismaEntity: PrismaAccountWithMetaAccount
  ): Account {
    return Account.fromPrimitives({
      id: prismaEntity.id,
      companyName: prismaEntity.companyName,
      vat: prismaEntity.vat,
      disabled: prismaEntity.disabled,
      address: {
        street: prismaEntity.street,
        addressNumber: prismaEntity.addressNumber,
        postalCode: prismaEntity.postalCode,
        region: prismaEntity.region,
        country: prismaEntity.country,
      },
      metaAccount: { id: prismaEntity.MetaAccount.id },
    });
  }
}
