import { ContactRepository } from '../domain/ContactRepository';
import { PrismaRepository } from '../../Shared/infrastructure/PrismaRepository';
import { Phone } from '../../Shared/domain/Phone/Phone';
import { Contact } from '../domain/Contact';
import { injectable } from 'inversify';
import { AccountId } from '../../Account/domain/value-object/AccountId';
import { ContactId } from '../domain/value-object/ContactId';
import { Contact as PrismaContact } from '@prisma/client';
import { ContactPersistenceError } from '../domain/exceptions/ContactPersistenceError';
import { Nullable } from '../../Shared/domain/Nullable';

@injectable()
export class PrismaContactRepository
  extends PrismaRepository<Contact>
  implements ContactRepository
{
  constructor() {
    super();
  }

  async findById(
    accountId: AccountId,
    id: ContactId
  ): Promise<Nullable<Contact>> {
    const query = {
      where: {
        accountId_id: {
          accountId: accountId.value,
          id: id.value,
        },
      },
    };

    const prismaContact = await this.client.contact.findUnique(query);

    if (!prismaContact) {
      return null;
    }

    return this.mapPrismaEntityToDomainEntity(prismaContact);
  }

  async searchAll(accountId: AccountId): Promise<Array<Contact>> {
    const query = {
      where: { accountId: accountId.value },
    };

    const prismaContacts = await this.client.contact.findMany(query);

    return prismaContacts.map((prismaContact) =>
      this.mapPrismaEntityToDomainEntity(prismaContact)
    );
  }

  async save(contact: Contact): Promise<void> {
    const query = {
      where: {
        accountId_id: {
          accountId: contact.accountId.value,
          id: contact.id.value,
        },
      },
      update: {
        name: contact.name.value,
        lastName: contact.lastName.value,
        prefix: contact.phone.prefix.value,
        number: contact.phone.number.value,
      },
      create: {
        accountId: contact.accountId.value,
        id: contact.id.value,
        name: contact.name.value,
        lastName: contact.lastName.value,
        prefix: contact.phone.prefix.value,
        number: contact.phone.number.value,
      },
    };

    try {
      await this.client.contact.upsert(query);
    } catch (error) {
      throw new ContactPersistenceError(contact);
    }
  }

  async findByPhone(
    accountId: AccountId,
    phone: Phone
  ): Promise<Nullable<Contact>> {
    const query = {
      where: {
        accountId: accountId.value,
        prefix: phone.prefix.value,
        number: phone.number.value,
      },
    };

    const prismaContact = await this.client.contact.findFirst(query);

    if (!prismaContact) {
      return null;
    }

    return this.mapPrismaEntityToDomainEntity(prismaContact);
  }

  mapPrismaEntityToDomainEntity(prismaEntity: PrismaContact): Contact {
    return Contact.fromPrimitives({
      accountId: prismaEntity.accountId,
      id: prismaEntity.id,
      name: prismaEntity.name,
      lastName: prismaEntity.lastName || '',
      prefix: prismaEntity.prefix,
      number: prismaEntity.number,
    });
  }
}
