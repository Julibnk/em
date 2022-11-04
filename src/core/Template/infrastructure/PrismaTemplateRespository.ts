import { Template } from '../domain/Template';
import { TemplateId } from '../domain/value-object/TemplateId';

import { injectable } from 'inversify';
import { Nullable } from '../../Shared/domain/Nullable';
import { PrismaClient } from '@prisma/client';
import { PrismaClientSingleton } from '../../Shared/infrastructure/PrismaClient';
import { TemplateRepository } from '../domain/TemplateRepository';
import { PrismaRepository } from '../../Shared/infrastructure/PrismaRepository';

@injectable()
export class PrismaTemplateRepository
  extends PrismaRepository
  implements TemplateRepository
{
  constructor() {
    super();
  }

  public async save(template: Template): Promise<void> {
    const templatePrimitives = template.toPrimitives();

    await this.client.template.upsert({
      where: {
        metaAccountId_id: {
          metaAccountId: templatePrimitives.id,
          id: templatePrimitives.id,
        },
      },
      update: {},
      create: {
        metaAccountId: templatePrimitives.id,
        id: templatePrimitives.id,
        status: templatePrimitives.status,
        createUsername: 'PEPE',
        updateUsername: 'PEPE',
        name: templatePrimitives.name,
      },
    });
  }

  public async findById(id: TemplateId): Promise<Template> {
    // this.client.template.
    throw new Error('Method not implemented.');
  }

  public async searchAll(): Promise<Array<Template>> {
    throw new Error('Method not implemented.');
  }
}
