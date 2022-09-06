import { Request, Response, NextFunction } from 'express';
import { ITemplateUseCases } from '../application/template.usecases';

// import { mapTemplateToDto } from '../mapper/template.mapper';

class TemplateController {
  constructor(private templateUseCases: ITemplateUseCases) {}

  async getAll(_: Request, res: Response) {
    const templateEntities = await this.templateUseCases.getAllTemplates();
    // Mapea las entities a Dtos
    // const templateDtos = templateEntities.map((template) =>
    //   mapTemplateToDto(template)
    // );
    // res.send(templateDtos);
  }
}

export default TemplateController;
