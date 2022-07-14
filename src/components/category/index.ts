import { makeCreateCategory } from './category-service';
import makeCategoryDal from './category-dal';
import { PrismaClient } from '@prisma/client';
import prisma from '../../utils/db';

// const prisma = new PrismaClient();

const categoryDal = makeCategoryDal({ db: prisma });

const createCategory = makeCreateCategory(categoryDal);

const categoryService = Object.freeze({ createCategory });

export default categoryService;

export { createCategory };
