import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { TemplateCreator } from '../../../core/template/application/TemplateCreator';
import { inject, injectable } from 'inversify';
import { DI_NAMESPACES } from '../../../core/Shared/dependency-injection/namespaces';
import { Primitives } from '../../../core/Shared/domain/common/Primitives';
import { Template } from '../../../core/template/domain/Template';
import { TemplateId } from '../../../core/template/domain/TemplateId';
import { TemplateName } from '../../../core/template/domain/TemplateName';
import { TemplateVariable } from '../../../core/template/domain/TemplateVariable';
import { TemplateShortDescription } from '../../../core/template/domain/TemplateShortDescription';
import { TemplatePreview } from '../../../core/template/domain/TemplatePreview';

// type TemplatePutRequest = Request & {
//   body: <Primitives<Template>>;
// };

@injectable()
export class TemplatePutController implements Controller {
  constructor(
    @inject(DI_NAMESPACES.TEMPLATE_CREATOR)
    private templateCreator: TemplateCreator
  ) {}

  async run(req: Request, res: Response) {
    const id = new TemplateId(req.params.id);
    const name = new TemplateName(req.body.name);
    const shortDescription = new TemplateShortDescription(
      req.body.shortDescription
    );
    const preview = new TemplatePreview(req.body.preview);
    const variable1 = new TemplateVariable(req.body.variable1);
    const variable2 = new TemplateVariable(req.body.variable2);
    const variable3 = new TemplateVariable(req.body.variable3);

    await this.templateCreator.run({
      id,
      name,
      shortDescription,
      preview,
      variable1,
      variable2,
      variable3,
    });
    res.status(httpStatus.CREATED).send();
    // } catch (error) {
    //   const message = error instanceof Error ? error.message : 'Unknown error';
    //   res.status(httpStatus.INTERNAL_SERVER_ERROR).send(message);
    // }
  }
}
