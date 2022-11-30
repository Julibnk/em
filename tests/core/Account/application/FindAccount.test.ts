import { AccountRepositoryMock } from '../__mocks__/AccountRepositoryMock';
import { FindAccountUseCase } from '../../../../src/core/Account/application/FindAccount';
import { AccountMother } from '../domain/AccountMother';
import { Account } from '../../../../src/core/Account/domain/Account';
import { AccountNotFoundError } from '../../../../src/core/Account/domain/exceptions/AccountNotFoundError';

let repository: AccountRepositoryMock;
let findAccountUseCase: FindAccountUseCase;
let account: Account;

describe('FindAccount use case', () => {
  beforeEach(() => {
    repository = new AccountRepositoryMock();
    findAccountUseCase = new FindAccountUseCase(repository);
    account = AccountMother.random();
  });

  it('Repository should be called with account id', async () => {
    repository.returnFindById(account);

    await findAccountUseCase.run(account.id.value);

    expect(repository.mockFindById).toHaveBeenCalledWith(account.id);
  });

  it('Should throw exception when account doesnt exists', async () => {
    expect(
      async () => await findAccountUseCase.run(account.id.value)
    ).rejects.toThrow(AccountNotFoundError);
  });
});
