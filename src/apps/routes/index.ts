import { Request, Response, Router } from 'express';
import glob from 'glob';
import httpStatus from 'http-status';
import { ValidationError, validationResult } from 'express-validator';

export function registerRoutes(router: Router) {
  const routes = glob.sync(__dirname.replace(/\\/g, '/') + '/**/*.route.*');
  routes.map((route) => !route.includes('.map') && register(route, router));
}

function register(routePath: string, app: Router) {
  const route = require(routePath);
  route.register(app);
}

export function validateReqSchema(req: Request, res: Response, next: Function) {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  }
  const errors = validationErrors
    .array()
    .map((err: ValidationError) => ({ [err.param]: err.msg }));

  return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
    errors,
  });
}
