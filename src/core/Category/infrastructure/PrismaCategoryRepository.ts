import { PrismaRepository } from '../../Shared/infrastructure/PrismaRepository';
import { Category } from '../domain/Category';
import { CategoryRepository } from '../domain/CategoryRepository';
import {
  Category as PrismaCategory,
  Template as PrismaTemplate,
} from '@prisma/client';
import { AccountId } from '../../Account/domain/value-object/AccountId';
import { CategoryNotFoundError } from '../domain/exceptions/CategoryNotFoundError';
import { CategoryId } from '../domain/value-object/CategoryId';
import { CategoryPersistenceError } from '../domain/exceptions/CategoryPersistenceError';
import { Nullable } from '../../Shared/domain/Nullable';
import { CategoryName } from '../domain/value-object/CategoryName';

type PrismaCategoryWithTemplate = PrismaCategory & {
  Template: Array<{ id: PrismaTemplate['id'] }>;
};

export class PrismaCategoryRepository
  extends PrismaRepository<Category>
  implements CategoryRepository
{
  async save(category: Category): Promise<void> {
    const templateConnection = category.templateIds.map((templateId) => {
      return {
        accountId_id: {
          accountId: category.accountId.value,
          id: templateId.value,
        },
      };
    });

    const query = {
      where: {
        accountId_id: {
          accountId: category.accountId.value,
          id: category.id.value,
        },
      },
      update: {
        name: category.name.value,
        description: category.description.value,
        Template: { connect: templateConnection },
      },
      create: {
        accountId: category.accountId.value,
        id: category.id.value,
        name: category.name.value,
        description: category.description.value,
        Template: { connect: templateConnection },
      },
    };
    try {
      await this.client.category.upsert(query);
    } catch (error) {
      throw new CategoryPersistenceError(category);
    }
  }

  async findById(accountId: AccountId, id: CategoryId): Promise<Category> {
    const query = {
      where: {
        accountId_id: {
          accountId: accountId.value,
          id: id.value,
        },
      },
      include: {
        Template: { select: { id: true } },
      },
    };

    const category = await this.client.category.findUnique(query);

    if (!category) {
      throw new CategoryNotFoundError(id);
    }

    return this.mapPrismaEntityToDomainEntity(category);
  }

  async searchAll(accountId: AccountId): Promise<Array<Category>> {
    const query = {
      where: { accountId: accountId.value },
      include: {
        Template: { select: { id: true } },
      },
    };

    const categories = await this.client.category.findMany(query);

    return categories.map((category) =>
      this.mapPrismaEntityToDomainEntity(category)
    );
  }

  async searchByName(
    accountId: AccountId,
    name: CategoryName
  ): Promise<Nullable<Category>> {
    const query = {
      where: { accountId: accountId.value, name: name.value },
      include: {
        Template: { select: { id: true } },
      },
    };

    const prismaCategory = await this.client.category.findFirst(query);

    if (!prismaCategory) {
      return null;
    }

    return this.mapPrismaEntityToDomainEntity(prismaCategory);
  }

  mapPrismaEntityToDomainEntity(
    prismaEntity: PrismaCategoryWithTemplate
  ): Category {
    return Category.fromPrimitives({
      accountId: prismaEntity.accountId,
      id: prismaEntity.id,
      name: prismaEntity.name,
      description: prismaEntity.description || '',
      templateIds: prismaEntity.Template.map((template) => template.id),
    });
  }
}
