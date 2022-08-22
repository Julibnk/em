import { v4 as uuid } from 'uuid';

export class UniqueEntityId {
  protected readonly _id: string;

  constructor(id?: string) {
    this._id = id ? id : uuid();
  }

  getValue() {
    return this._id;
  }
}
