import { UniqueEntityId } from '../../../common/domain/entity-id';

interface ITemplateProps {
  name: string;
  shortDescription?: string;
}

class Template implements ITemplateProps {
  private constructor(
    public id: UniqueEntityId,
    public name: string,
    public shortDescription?: string
  ) {}

  // Creación de la instancia
  public static create(props: ITemplateProps, id?: UniqueEntityId): Template {
    const templateId = id ? id : new UniqueEntityId();

    const { name, shortDescription } = props;

    return new Template(templateId, name, shortDescription);
  }
}

export default Template;
