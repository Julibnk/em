import makeCategory, { Category } from './category-entity';
import { PrismaClient, Category as DBCategory, Prisma } from '@prisma/client';
import buildCategoryDal, { CategoryDal } from './category-dal';

// PrismaClient.

export const buildCreateCategory =
  // (db: PrismaClient) => async (categoryInfo: Category) => {


    ({ createCategory, findCategoryByName }: CategoryDal) =>
    async (categoryInfo: Category) => {
      const category = makeCategory(categoryInfo);

      const { accountId, name } = category;

      const exists = await findCategoryByName(accountId, name);

      if (exists) {
        throw Error('Ya existe');
      }

      return createCategory({
        name,
        createUsername: 'You',
        updateUsername: 'Tambien you',
        Account: { connect: { id: accountId } },
      });
    };
