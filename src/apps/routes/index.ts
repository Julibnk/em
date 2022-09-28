import { Router } from 'express';
import glob from 'glob';

export function registerRoutes(router: Router) {
  const routes = glob.sync(__dirname.replace(/\\/g, '/') + '/**/*.route.*');
  routes.map((route) => !route.includes('.map') && register(route, router));
}

function register(routePath: string, app: Router) {
  const route = require(routePath);
  route.register(app);
}
