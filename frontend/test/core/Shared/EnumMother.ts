import { MotherCreator } from './MotherCreator';

export class EnumMother {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static create<T>(values: Array<T>): T {
    return MotherCreator.random().helpers.arrayElement<T>(values);
  }
}
