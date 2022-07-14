import { PrismaClient, Prisma } from '@prisma/client';

interface MakeCategoryDalProps {
  db: PrismaClient;
}

const makeCategoryDal = ({ db }: MakeCategoryDalProps) => {
  return Object.freeze({
    // Busca categoria por nombre
    findCategoryByName: async (accountId: string, name: string) => {
      return await db.category.findFirst({
        where: {
          accountId,
          name,
        },
      });
    },

    // Crea una nueva categoria en BD
    createCategory: async (dbCategory: Prisma.CategoryCreateInput) => {
      return await db.category.create({
        data: dbCategory,
      });
    },
  });
};

export type CategoryDal = ReturnType<typeof makeCategoryDal>;

export default makeCategoryDal;
