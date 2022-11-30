import { AccountPhoneRepositoryMock } from '../__mocks__/AccountPhoneRepositoryMock';
import { SaveAccountPhoneUseCase } from '../../../../src/core/AccountPhone/application/SaveAccountPhone';
import { AccountPhone } from '../../../../src/core/AccountPhone/domain/AccountPhone';
import { AccountPhoneMother } from '../domain/AccountPhoneMother';
import { PhoneMother } from '../../Shared/domain/Phone/PhoneMother';
import { AccountPhoneAlreadyExistsError } from '../../../../src/core/AccountPhone/domain/exceptions/AccountPhoneAlreadyExistsError';

let repository: AccountPhoneRepositoryMock;
let saveAccountPhoneUseCase: SaveAccountPhoneUseCase;
let accountPhone: AccountPhone;

describe('SaveAccountPhone use case', () => {
  beforeEach(() => {
    repository = new AccountPhoneRepositoryMock();
    saveAccountPhoneUseCase = new SaveAccountPhoneUseCase(repository);
  });

  describe('=> Update account phone', () => {
    beforeEach(() => {
      accountPhone = AccountPhoneMother.random();
    });

    it('Should update account phone if already exists', async () => {
      repository.returnFindById(accountPhone);

      const originalPhone = AccountPhoneMother.makeCopy(accountPhone);
      const changedPhone = AccountPhoneMother.makeCopy(accountPhone);

      changedPhone.change(PhoneMother.random());

      const useCaseParams = { ...changedPhone.toPrimitives() };

      await saveAccountPhoneUseCase.run(useCaseParams);
      expect(repository.mockSave).toHaveBeenCalledWith(changedPhone);
      expect(repository.mockSave).not.toHaveBeenCalledWith(originalPhone);

      accountPhone.change = jest.fn();
      await saveAccountPhoneUseCase.run(useCaseParams);
      expect(accountPhone.change).toHaveBeenCalledWith(changedPhone.phone);
    });
  });

  describe('=> Create account phone', () => {
    beforeEach(() => {
      accountPhone = AccountPhoneMother.random();
    });

    it('Should create an account phone', async () => {
      const useCaseParams = { ...accountPhone.toPrimitives() };

      await saveAccountPhoneUseCase.run(useCaseParams);
      expect(repository.mockSave).toHaveBeenCalledWith(accountPhone);
    });

    it('Should throw an exception if same phone already exists', async () => {
      repository.returnFindByPhone(accountPhone);

      const useCaseParams = { ...accountPhone.toPrimitives() };

      expect(
        async () => await saveAccountPhoneUseCase.run(useCaseParams)
      ).rejects.toThrow(AccountPhoneAlreadyExistsError);
    });
  });
});
