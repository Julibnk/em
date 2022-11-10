import { IntegerMother } from './IntegerMother';
export class Repeater {
  //eslint-disable-next-line
  static random(callable: Function, iterations?: number) {
    return Array(iterations || IntegerMother.random(20))
      .fill({})
      .map(() => callable());
  }
}
