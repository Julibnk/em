import express from 'express';

import TemplateUseCases from '../../../core/template/application/template.usecases';
import PrismaTemplateRepository from '../../../core/template/infrastructure/prisma-template.repository';
import MockTemplateRepository from '../../../core/template/infrastructure/mock-template.repository';

import TemplateController from '../../../core/template/infrastructure/template.controller';

// Inyecta el repositorio a los casos de uso
const templateUseCases = new TemplateUseCases(new PrismaTemplateRepository());

// Inyecta los casos de uso al controlador
const templateController = new TemplateController(templateUseCases);

const templateRouter = express.Router();

templateRouter.get('/', templateController.getAll);

export default templateRouter;
