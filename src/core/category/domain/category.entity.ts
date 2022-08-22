import { UniqueEntityId } from '../../../common/domain/entity-id';

class Category {
  private constructor(public id: UniqueEntityId) {}

  public static create(id?: UniqueEntityId): Category {
    const categoryId = id ? id : new UniqueEntityId();
    return new Category(categoryId);
  }
}

export default Category;
