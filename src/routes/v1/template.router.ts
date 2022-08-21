import express from 'express';

import factoryTemplateUseCases from '../../core/template/use-cases/template.usecases';

import prismaTemplateRepository from '../../core/template/infra/prisma-template.repository';

import factoryTemplateController from '../../core/template/infra/template.controller';

// Inyecta el repositorio a los casos de uso
const templateUseCases = factoryTemplateUseCases(prismaTemplateRepository);

// Inyecta los casos de uso al controlador
const templateController = factoryTemplateController(templateUseCases);

const templateRouter = express.Router();

templateRouter.get('/', templateController.getAll);

export default templateRouter;
