import { TemplateMessageRepository } from '../domain/TemplateMessageRespository';
import { PrismaRepository } from '../../Shared/infrastructure/PrismaRepository';
import { TemplateMessage } from '../domain/TemplateMessage';
import { Message as PrismaMessage, Prisma } from '@prisma/client';
import { TemplateMessagePersistenceError } from '../domain/exceptions/TemplateMessagePersistenceError';
import { AccountId } from '../../Account/domain/value-object/AccountId';
import { TemplateMessageId } from '../domain/value-object/TemplateMessageId';
import { Nullable } from '../../Shared/domain/Nullable';
import { injectable } from 'inversify';

@injectable()
export class PrismaTemplateMessageRepository
  extends PrismaRepository<TemplateMessage>
  implements TemplateMessageRepository
{
  async save(templateMessage: TemplateMessage): Promise<void> {
    const query: Prisma.MessageUpsertArgs = {
      where: {
        accountId_id: {
          accountId: templateMessage.accountId.value,
          id: templateMessage.id.value,
        },
      },
      update: {
        status: templateMessage.status.value,
        sentDate: templateMessage.sentDate?.value,
        scheduleDate: templateMessage.scheduleDate?.value,
        parameter1: templateMessage.parameter1.value,
        parameter2: templateMessage.parameter2.value,
        parameter3: templateMessage.parameter3.value,
        templateId: templateMessage.templateId.value,
        accountPhoneId: templateMessage.accountPhoneId.value,
        contactId: templateMessage.contactId.value,
      },
      create: {
        accountId: templateMessage.accountId.value,
        id: templateMessage.id.value,
        status: templateMessage.status.value,
        sentDate: templateMessage.sentDate?.value,
        scheduleDate: templateMessage.scheduleDate?.value,
        parameter1: templateMessage.parameter1.value,
        parameter2: templateMessage.parameter2.value,
        parameter3: templateMessage.parameter3.value,
        templateId: templateMessage.templateId.value,
        accountPhoneId: templateMessage.accountPhoneId.value,
        contactId: templateMessage.contactId.value,
      },
    };

    try {
      await this.client.message.upsert(query);
    } catch (error) {
      throw new TemplateMessagePersistenceError(templateMessage);
    }
  }

  async findById(
    accountId: AccountId,
    id: TemplateMessageId
  ): Promise<Nullable<TemplateMessage>> {
    const query = {
      where: {
        accountId_id: {
          accountId: accountId.value,
          id: id.value,
        },
      },
      include: {
        Template: true,
        AccountPhone: true,
        Contact: true,
      },
    };

    const templateMessage = await this.client.message.findUnique(query);

    if (!templateMessage) {
      return null;
    }

    return this.mapPrismaEntityToDomainEntity(templateMessage);
  }

  mapPrismaEntityToDomainEntity(prismaEntity: PrismaMessage): TemplateMessage {
    return TemplateMessage.fromPrimitives({
      id: prismaEntity.id,
      accountId: prismaEntity.accountId,
      status: prismaEntity.status,
      sentDate: prismaEntity.sentDate,
      scheduleDate: prismaEntity.scheduleDate,
      parameter1: prismaEntity.parameter1 || '',
      parameter2: prismaEntity.parameter2 || '',
      parameter3: prismaEntity.parameter3 || '',
      templateId: prismaEntity.templateId,
      accountPhoneId: prismaEntity.accountPhoneId,
      contactId: prismaEntity.contactId,
    });
  }
}
