import { makeCreateCategory } from './category-service';
import makeCategoryDal from './category-dal';
import { prismaClient as db } from '../../db/prisma';

// Data access layer
const categoryDal = makeCategoryDal({ db });

// Use cases - Services
const createCategory = makeCreateCategory(categoryDal);

const categoryService = Object.freeze({ createCategory });

export default categoryService;

export { createCategory };
