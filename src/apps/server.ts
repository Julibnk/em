import bodyParser from 'body-parser';
import compress from 'compression';
import errorHandler from 'errorhandler';
import express, { Request, Response, NextFunction } from 'express';
import Router from 'express-promise-router';
import helmet from 'helmet';
import * as http from 'http';
import httpStatus from 'http-status';
import { registerRoutes } from './routes';
import Logger from '../core/Shared/domain/Logger';
import { container, DiDomain } from '../core/Shared/dependency-injection';
import { DomainError } from '../core/Shared/domain/DomainError';

export class Server {
  private express: express.Express;
  private port: string;
  private httpServer?: http.Server;
  private logger: Logger;

  constructor(port: string) {
    this.port = port;
    this.express = express();
    this.logger = container.get<Logger>(DiDomain.logger);
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(helmet.xssFilter());
    this.express.use(helmet.noSniff());
    this.express.use(helmet.hidePoweredBy());
    this.express.use(helmet.frameguard({ action: 'deny' }));
    this.express.use(compress());
    const router = Router();
    router.use(errorHandler());

    this.express.use(router);

    registerRoutes(router);

    //El middleware necesita 4 parametros para detectar el callback de error
    router.use(
      // eslint-disable-next-line
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        this.logger.error(err);

        if (err instanceof DomainError) {
          res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: err.message });
        }

        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
      }
    );
  }

  async listen(): Promise<void> {
    return new Promise((resolve) => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(
          `EM backend running at http://localhost:${this.port} in ${process.env.NODE_ENV} mode`
        );
        console.log('Press CTRL-C to stop\n');
        resolve();
      });
    });
  }

  getHTTPServer() {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }
}
