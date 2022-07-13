import { PrismaClient, Prisma } from '@prisma/client';

interface BuildCategoryDalProps {
  db: PrismaClient;
}

const buildCategoryDal = ({ db }: BuildCategoryDalProps) => {
  return {
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
  };
};

export type CategoryDal = ReturnType<typeof buildCategoryDal>;

export default buildCategoryDal;

// export const insertCategory = async ({ db, category }: IInsertCategory) => {
//   // Prisma.
//   const a: Category = {
//     accountId: '899b41de-0012-4d6e-a594-24992fdd5936',
//     id: '',
//     name: 'asda',
//     shortDescription: null,
//     createdAt: new Date(),
//     createUsername: 'You',
//     updatedAt: new Date(),
//     updateUsername: 'You',
//     deleted: false,
//   };

//   db.category.create({ data: a });
// };
