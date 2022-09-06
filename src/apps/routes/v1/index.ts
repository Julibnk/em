import express from 'express';
import categoryRouter from './category.router';
import templateRouter from './template.router';

const routerV1 = express.Router();

routerV1.use('/categories', categoryRouter);
routerV1.use('/templates', templateRouter);
/*test feature*/
export default routerV1;
