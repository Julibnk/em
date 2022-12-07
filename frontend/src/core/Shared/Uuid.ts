import { v4 as uuid } from 'uuid';

export class Uuid {
  static create(): string {
    return uuid();
  }
}
