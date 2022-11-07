import { AccountId } from '../../Account/domain/value-object/AccountId';
import { UserEmail } from './value-object/UserEmail';
import { User } from './User';
import { Nullable } from '../../Shared/domain/Nullable';

export interface UserRepository {
  searchByEmail(
    accountId: AccountId,
    email: UserEmail
  ): Promise<Nullable<User>>;
}
