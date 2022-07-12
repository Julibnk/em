import express from 'express';
import { categoryRouter } from '../../components/category';

const router = express.Router();

router.use('/category', categoryRouter);

export default router;
