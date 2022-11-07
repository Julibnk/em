import { AccountId } from '../value-object/AccountId';

export class AccountNotFoundError extends Error {
  constructor(accountId: AccountId) {
    super(`Account with id ${accountId.value} not found`);
  }
}
