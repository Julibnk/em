import { Template } from '../domain/Template';
import { TemplateId } from '../domain/value-object/TemplateId';

import { Template as PrismaTemplate } from '@prisma/client';

import { injectable } from 'inversify';
import { TemplateRepository } from '../domain/TemplateRepository';
import { PrismaRepository } from '../../Shared/infrastructure/PrismaRepository';
import { AccountId } from '../../Account/domain/value-object/AccountId';
import { TemplateNotFoundError } from '../domain/exceptions/TemplateNotFoundError';

@injectable()
export class PrismaTemplateRepository
  extends PrismaRepository<Template>
  implements TemplateRepository
{
  constructor() {
    super();
  }

  public async save(template: Template): Promise<void> {
    await this.client.template.upsert({
      where: {
        accountId_id: {
          accountId: template.accountId.value,
          id: template.id.value,
        },
      },
      update: {
        status: template.status.value,
        name: template.name.value,
        shortDescription: template.shortDescription.value,
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
        shortDescription: template.shortDescription.value,
        preview: template.preview.value,
        variable1: template.variable1.value,
        variable2: template.variable2.value,
        variable3: template.variable3.value,
      },
    });
  }

  async findById(accountId: AccountId, id: TemplateId): Promise<Template> {
    const prismaTemplate = await this.client.template.findUnique({
      where: {
        accountId_id: {
          accountId: accountId.value,
          id: id.value,
        },
      },
    });

    if (!prismaTemplate) {
      throw new TemplateNotFoundError(accountId, id);
    }

    return this.mapPrismaEntityToDomainEntity(prismaTemplate);
  }

  async searchAll(accountId: AccountId): Promise<Array<Template>> {
    const prismaTemplates = await this.client.template.findMany({
      where: { accountId: accountId.value },
    });

    return prismaTemplates.map((prismaTemplate) =>
      this.mapPrismaEntityToDomainEntity(prismaTemplate)
    );
  }

  mapPrismaEntityToDomainEntity(prismaEntity: PrismaTemplate) {
    return Template.fromPrimitives({
      accountId: prismaEntity.accountId,
      id: prismaEntity.id,
      name: prismaEntity.name,
      preview: prismaEntity.preview || '',
      status: prismaEntity.status,
      shortDescription: prismaEntity.shortDescription || '',
      variable1: prismaEntity.variable1 || '',
      variable2: prismaEntity.variable2 || '',
      variable3: prismaEntity.variable3 || '',
    });
  }
}
