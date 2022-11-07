import { Vat } from '../../../../src/core/Account/domain/value-object/Vat';
import { WordMother } from '../../Shared/domain/WordMother';

export class VatMother {
  static create(value: string): Vat {
    return new Vat(value);
  }

  static random(): Vat {
    return this.create(WordMother.random());
  }
}
