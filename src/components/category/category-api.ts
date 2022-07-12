import express from 'express';
import {
  createCategory,
  readCategory,
  updateCategory,
  deleteCategory,
  searchCategories,
} from './category-controller';

const router = express.Router();

router
  .route('/')
  .get(readCategory)
  .post(createCategory)
  .put(updateCategory)
  .delete(deleteCategory);

router.get('/search', searchCategories);

export default router;
