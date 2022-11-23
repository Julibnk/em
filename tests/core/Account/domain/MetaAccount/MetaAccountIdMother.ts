import { MetaAccountId } from '../../../../../src/core/Account/domain/MetaAccount/value-object/MetaAccountId';
import { UuidMother } from '../../../Shared/domain/UuidMother';

export class MetaAccountIdMother {
  static create(value: string): MetaAccountId {
    return new MetaAccountId(value);
  }

  static random(): MetaAccountId {
    return this.create(UuidMother.random());
  }
}
