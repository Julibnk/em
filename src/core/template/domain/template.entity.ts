import { UniqueEntityId } from '../../common/domain/entity-id';

interface ITemplateProps {
  name: string;
  description?: string;
  preview?: string;
  variable1?: string;
  variable2?: string;
  variable3?: string;
}

export class Template implements ITemplateProps {
  id: UniqueEntityId;
  name: string;
  description?: string;
  preview?: string;
  variable1?: string;
  variable2?: string;
  variable3?: string;

  constructor(
    {
      name,
      description,
      preview,
      variable1,
      variable2,
      variable3,
    }: ITemplateProps,
    id?: UniqueEntityId
  ) {
    this.id = id ? id : new UniqueEntityId();
    this.name = name;
    this.description = description;
    this.preview = preview;
    this.variable1 = variable1;
    this.variable2 = variable2;
    this.variable3 = variable3;
  }

  // public static createTemplate(
  //   props: ITemplateProps,
  //   id?: UniqueEntityId
  // ): TemplateEntity {
  //   const templateId = id ? id : new UniqueEntityId();

  //   return new TemplateEntity(props, templateId);
  // }

  //   set name
}
