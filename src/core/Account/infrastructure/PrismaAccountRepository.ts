import { AccountRepository } from '../domain/AccountRepository';
import { PrismaRepository } from '../../Shared/infrastructure/PrismaRepository';
import { Account } from '../domain/Account';
import { AccountId } from '../domain/value-object/AccountId';

import { Account as PrismaAccount } from '@prisma/client';
import { injectable } from 'inversify';
import { Nullable } from '../../Shared/domain/Nullable';

@injectable()
export class PrismaAccountRepository
  extends PrismaRepository<Account>
  implements AccountRepository
{
  async save(account: Account): Promise<void> {
    await this.client.account.upsert({
      where: {
        id: account.id.value,
      },
      update: {
        vat: account.vat.value,
        street: account.street.value,
        addressNumber: account.addressNumber.value,
        postalCode: account.postalCode.value,
        region: account.region.value,
        country: account.country.value,
        disabled: account.disabled.value,
      },
      create: {
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
  }

  async findById(id: AccountId): Promise<Nullable<Account>> {
    const prismaAccount = await this.client.account.findUnique({
      where: {
        id: id.value,
      },
    });

    if (!prismaAccount) {
      return null;
    }

    return this.mapPrismaEntityToDomainEntity(prismaAccount);
  }

  mapPrismaEntityToDomainEntity(prismaEntity: PrismaAccount): Account {
    return Account.fromPrimitives({
      id: prismaEntity.id,
      companyName: prismaEntity.companyName,
      vat: prismaEntity.vat,
      street: prismaEntity.street,
      addressNumber: prismaEntity.addressNumber,
      postalCode: prismaEntity.postalCode,
      disabled: prismaEntity.disabled,
    });
  }
}
