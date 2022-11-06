import { AccountId } from '../domain/value-object/AccountId';

export class AccountNotFoundError extends Error {
  constructor(accountId: AccountId) {
    super(`Account with id ${accountId.value} not found`);
  }
}
