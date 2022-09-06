import { UniqueEntityId } from '../../shared/domain/entity-id';
import Template from '../../template/domain/template.entity';

interface ICategoryProps {
  templates?: Template[];
}
class Category implements ICategoryProps {
  private constructor(
    public id: UniqueEntityId,
    public templates?: Template[]
  ) {}

  public static create(props: ICategoryProps, id?: UniqueEntityId): Category {
    const categoryId = id ? id : new UniqueEntityId();

    const { templates } = props;

    return new Category(categoryId, templates);
  }
}

export default Category;
