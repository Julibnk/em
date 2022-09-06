import express, { Request, Response } from 'express';
import routerV1 from './src/apps/routes/v1';
import cors from 'cors';
import helmet from 'helmet';

import { logger } from './src/apps/utils/logger';

const app = express();
const port = process.env.port || 8000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/v1', routerV1);

app.listen(port, () => {
  logger.info(`Running in port ${port}`);
});
