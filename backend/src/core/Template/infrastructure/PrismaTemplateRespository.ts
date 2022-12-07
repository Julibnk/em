import { Template } from '../domain/Template';
import { TemplateId } from '../domain/value-object/TemplateId';
import { Template as PrismaTemplate } from '@prisma/client';
import { injectable } from 'inversify';
import { TemplateRepository } from '../domain/TemplateRepository';
import { PrismaRepository } from '../../Shared/infrastructure/PrismaRepository';
import { AccountId } from '../../Account/domain/value-object/AccountId';
import { Nullable } from '../../Shared/domain/Nullable';
import { TemplateName } from '../domain/value-object/TemplateName';
import { TemplatePersistenceError } from '../domain/exceptions/TemplatePersistenceError';

@injectable()
export class PrismaTemplateRepository
  extends PrismaRepository<Template>
  implements TemplateRepository
{
  constructor() {
    super();
  }

  async save(template: Template): Promise<void> {
    const query = {
      where: {
        accountId_id: {
          accountId: template.accountId.value,
          id: template.id.value,
        },
      },
      update: {
        status: template.status.value,
        name: template.name.value,
        description: template.description.value,
        preview: template.preview.value,
        variable1: template.variable1.value,
        variable2: template.variable2.value,
        variable3: template.variable3.value,
      },
      create: {
        accountId: template.accountId.value,
        id: template.id.value,
        status: template.status.value,
        name: template.name.value,
        description: template.description.value,
        preview: template.preview.value,
        variable1: template.variable1.value,
        variable2: template.variable2.value,
        variable3: template.variable3.value,
      },
    };

    try {
      await this.client.template.upsert(query);
    } catch (error) {
      throw new TemplatePersistenceError(template);
    }
  }

  async findById(
    accountId: AccountId,
    id: TemplateId
  ): Promise<Nullable<Template>> {
    const query = {
      where: {
        accountId_id: {
          accountId: accountId.value,
          id: id.value,
        },
      },
    };

    const prismaTemplate = await this.client.template.findUnique(query);

    if (!prismaTemplate) {
      return null;
    }

    return this.mapPrismaEntityToDomainEntity(prismaTemplate);
  }

  async searchAll(accountId: AccountId): Promise<Array<Template>> {
    const query = {
      where: { accountId: accountId.value },
    };

    const prismaTemplates = await this.client.template.findMany(query);

    return prismaTemplates.map((prismaTemplate) =>
      this.mapPrismaEntityToDomainEntity(prismaTemplate)
    );
  }

  async findByName(
    accountId: AccountId,
    name: TemplateName
  ): Promise<Nullable<Template>> {
    const query = {
      where: { accountId: accountId.value, name: name.value },
    };

    const prismaTemplate = await this.client.template.findFirst(query);

    if (!prismaTemplate) {
      return null;
    }

    return this.mapPrismaEntityToDomainEntity(prismaTemplate);
  }

  mapPrismaEntityToDomainEntity(prismaEntity: PrismaTemplate) {
    return Template.fromPrimitives({
      accountId: prismaEntity.accountId,
      id: prismaEntity.id,
      name: prismaEntity.name,
      preview: prismaEntity.preview || '',
      status: prismaEntity.status,
      description: prismaEntity.description || '',
      variable1: prismaEntity.variable1 || '',
      variable2: prismaEntity.variable2 || '',
      variable3: prismaEntity.variable3 || '',
    });
  }
}
