import express from 'express';

import factoryTemplateUseCases from '../use-cases/template.usecases';

import prismaTemplateRepository from './prisma-template.repository';

import factoryTemplateController from './template.controller';

// Inyecta el repositorio a los casos de uso
const templateUseCases = factoryTemplateUseCases(prismaTemplateRepository);

// Inyecta los casos de uso al controlador
const templateController = factoryTemplateController(templateUseCases);

const templateRouter = express.Router();

templateRouter.get('/', templateController.getAll);

export default templateRouter;
