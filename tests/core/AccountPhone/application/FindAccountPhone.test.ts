import { AccountPhoneRepositoryMock } from '../__mocks__/AccountPhoneRepositoryMock';
import { FindAccountPhoneUseCase } from '../../../../src/core/AccountPhone/application/FindAccountPhone';
import { AccountPhoneMother } from '../domain/AccountPhoneMother';
import { AccountPhone } from '../../../../src/core/AccountPhone/domain/AccountPhone';
import { AccountPhoneNotFoundError } from '../../../../src/core/AccountPhone/domain/exceptions/AccountPhoneNotFoundError';

let repository: AccountPhoneRepositoryMock;
let findAccountPhoneUseCase: FindAccountPhoneUseCase;
let accountPhone: AccountPhone;

describe('FindTemplate use case', () => {
  beforeEach(() => {
    repository = new AccountPhoneRepositoryMock();
    findAccountPhoneUseCase = new FindAccountPhoneUseCase(repository);
    accountPhone = AccountPhoneMother.random();
  });

  it('Repository should be called with account and account phone id', async () => {
    repository.returnFindById(accountPhone);

    await findAccountPhoneUseCase.run(
      accountPhone.accountId.value,
      accountPhone.id.value
    );

    expect(repository.mockFindById).toHaveBeenCalledWith(
      accountPhone.accountId,
      accountPhone.id
    );
  });

  it('Should throw exception when account phone doesnt exists', async () => {
    expect(
      async () =>
        await findAccountPhoneUseCase.run(
          accountPhone.accountId.value,
          accountPhone.id.value
        )
    ).rejects.toThrow(AccountPhoneNotFoundError);
  });
});
