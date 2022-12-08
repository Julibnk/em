import { PrismaRepository } from '../../Shared/infrastructure/PrismaRepository';
import { Category } from '../domain/Category';
import { CategoryRepository } from '../domain/CategoryRepository';
import {
  Category as PrismaCategory,
  // Template as PrismaTemplate,
  TemplatesOnCategories,
  Prisma,
} from '@prisma/client';
import { AccountId } from '../../Account/domain/value-object/AccountId';
import { CategoryId } from '../domain/value-object/CategoryId';
import { CategoryPersistenceError } from '../domain/exceptions/CategoryPersistenceError';
import { Nullable } from '../../Shared/domain/Nullable';
import { CategoryName } from '../domain/value-object/CategoryName';

// type PrismaCategoryWithTemplate = PrismaCategory & {
//   templates: Array<{ id: PrismaTemplate['id'] }>;
// };
type PrismaCategoryWithTemplate = PrismaCategory & {
  templates: TemplatesOnCategories[];
};

export class PrismaCategoryRepository
  extends PrismaRepository<Category>
  implements CategoryRepository
{
  async save(category: Category): Promise<void> {
    const templateManyToManyRelation =
      this.fillExplicitManyToManyTemplateRelations(category);

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
        templates: templateManyToManyRelation,
      },
      create: {
        accountId: category.accountId.value,
        id: category.id.value,
        name: category.name.value,
        description: category.description.value,
        templates: templateManyToManyRelation,
      },
    };
    try {
      await this.client.category.upsert(query);
    } catch (error) {
      throw new CategoryPersistenceError(category);
    }
  }

  async findById(
    accountId: AccountId,
    id: CategoryId
  ): Promise<Nullable<Category>> {
    const query = {
      where: {
        accountId_id: {
          accountId: accountId.value,
          id: id.value,
        },
      },
      include: {
        templates: true,
      },
    };

    const category = await this.client.category.findUnique(query);

    if (!category) {
      return null;
    }

    return this.mapPrismaEntityToDomainEntity(category);
  }

  async searchAll(accountId: AccountId): Promise<Array<Category>> {
    const query = {
      where: { accountId: accountId.value },
      include: {
        templates: true,
      },
    };

    const categories = await this.client.category.findMany(query);

    return categories.map((category) =>
      this.mapPrismaEntityToDomainEntity(category)
    );
  }

  async findByName(
    accountId: AccountId,
    name: CategoryName
  ): Promise<Nullable<Category>> {
    const query = {
      where: { accountId: accountId.value, name: name.value },
      include: {
        templates: true,
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
      templateIds: prismaEntity.templates.map(
        (template) => template.templateId
      ),
    });
  }

  fillExplicitManyToManyTemplateRelations(
    category: Category
  ): Prisma.TemplatesOnCategoriesCreateNestedManyWithoutCategoryInput {
    return {
      connectOrCreate: category.templateIds.map((templateId) => {
        return {
          where: {
            accountId_categoryId_templateId: {
              accountId: category.accountId.value,
              categoryId: category.id.value,
              templateId: templateId.value,
            },
          },
          create: {
            account: { connect: { id: category.accountId.value } },
            template: {
              connect: {
                accountId_id: {
                  accountId: category.accountId.value,
                  id: templateId.value,
                },
              },
            },
          },
        };
      }),
    };
  }
}
