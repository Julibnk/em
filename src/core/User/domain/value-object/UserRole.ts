import { EnumValueObject } from '../../../Shared/domain/value-object/EnumValueObject';
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';

export enum UserRoles {
  ACCOUNT_ADMIN = 'ACCOUNT_ADMIN',
  USER = 'USER',
}

export class UserRole extends EnumValueObject<UserRoles> {
  constructor(value: UserRoles) {
    super(value, Object.values(UserRoles));
  }

  static fromValue(value: string): UserRole {
    switch (value) {
      case UserRoles.ACCOUNT_ADMIN:
        return new UserRole(UserRoles.ACCOUNT_ADMIN);
      case UserRoles.USER:
        return new UserRole(UserRoles.USER);
      default:
        throw new InvalidArgumentError();
    }
  }

  protected throwErrorForInvalidValue(value: string): void {
    throw new Error(`The user role ${value} is invalid`);
  }
}
