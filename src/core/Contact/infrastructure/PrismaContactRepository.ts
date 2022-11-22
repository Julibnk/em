import { ContactRepository } from '../domain/ContactRepository';
import { PrismaRepository } from '../../Shared/infrastructure/PrismaRepository';
import { Phone } from '../../Shared/domain/value-object/Phone';
import { Contact } from '../domain/Contact';
import { injectable } from 'inversify';
import { AccountId } from '../../Account/domain/value-object/AccountId';
import { ContactId } from '../domain/value-object/ContactId';
import { Contact as PrismaContact } from '@prisma/client';

@injectable()
export class PrismaContactRepository
  extends PrismaRepository<Contact>
  implements ContactRepository
{
  constructor() {
    super();
  }

  findById(accountId: AccountId, id: ContactId): Promise<Contact> {
    // const query = {
    //   where: {
    //     accountId_id: {
    //       accountId: accountId.value,
    //       id: id.value,
    //     },
    //   }
    // }

    // const prismaContact = await this.client.contact.findUnique(query);

    // if (!prismaContact) {
    //   throw new TemplateNotFoundError(accountId, id);
    // }

    throw new Error('Method not implemented.');
  }

  save(contact: Contact): Promise<void> {
    throw new Error('Method not implemented.');
  }

  searchByPhone(accountId: AccountId, phone: Phone): Promise<Contact> {
    throw new Error('Method not implemented.');
  }

  mapPrismaEntityToDomainEntity(prismaEntity: PrismaContact): Contact {
    throw new Error('Method not implemented.');
  }

  //   constructor() {
  //     super(Contact);
  //   }
}
