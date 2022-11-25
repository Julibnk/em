import { AccountRepositoryMock } from '../__mocks__/AccountRepositoryMock';
import { SaveAccountUseCase } from '../../../../src/core/Account/application/SaveAccount';
import { Account } from '../../../../src/core/Account/domain/Account';
import { AccountMother } from '../domain/AccountMother';
import { CompanyNameMother } from '../domain/CompanyNameMother';
import { AddressMother } from '../../Shared/domain/Address/AddressMother';
import { MetaAccountMother } from '../domain/MetaAccount/MetaAccountMother';

let repository: AccountRepositoryMock;
let saveAccountUseCase: SaveAccountUseCase;
let account: Account;

describe('SaveAccount use case', () => {
  beforeEach(() => {
    repository = new AccountRepositoryMock();
    saveAccountUseCase = new SaveAccountUseCase(repository);
  });

  describe('=> Update account', () => {
    beforeEach(() => {
      account = AccountMother.random();
    });

    it('Should update account if already exists', async () => {
      //  Se crea una copia de la cuenta original para romper la referencia y comprobar que ambas versiones son distintas
      repository.returnFindById(account);

      const originalAccount = AccountMother.makeCopy(account);
      const changedAccount = AccountMother.makeCopy(account);
      // template.change(newDes, newPrev, newVar1, newVar2, newVar3);
      changedAccount.change(
        CompanyNameMother.random(),
        AddressMother.random(),
        MetaAccountMother.random()
      );

      const useCaseParams = { ...changedAccount.toPrimitives() };

      await saveAccountUseCase.run(useCaseParams);
      expect(repository.mockSave).toHaveBeenCalledWith(changedAccount);
      expect(repository.mockSave).not.toHaveBeenCalledWith(originalAccount);
    });
  });

  describe('=> Create account', () => {
    beforeEach(() => {
      account = AccountMother.random();
    });

    it('Should create a template', async () => {
      const useCaseParams = { ...account.toPrimitives() };

      await saveAccountUseCase.run(useCaseParams);
      expect(repository.mockSave).toHaveBeenCalledWith(account);
    });
  });
});
