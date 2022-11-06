import { EnumValueObject } from '../../../Shared/domain/value-object/EnumValueObject';

enum UserRoles {
  ACCOUNT_ADMIN = 'ACCOUNT_ADMIN',
  USER = 'USER',
}

export class UserRole extends EnumValueObject<UserRoles> {
  protected throwErrorForInvalidValue(): void {
    throw new Error('Method not implemented.');
  }
}
