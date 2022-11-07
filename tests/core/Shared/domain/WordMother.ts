import { MotherCreator } from './MotherCreator';

export class WordMother {
  static random(): string {
    return MotherCreator.random().lorem.word();
  }

  static address(): string {
    return MotherCreator.random().address.streetAddress();
  }

  static zipCode(): string {
    return MotherCreator.random().address.zipCode();
  }

  static buildingNumber(): string {
    return MotherCreator.random().address.buildingNumber();
  }
}
