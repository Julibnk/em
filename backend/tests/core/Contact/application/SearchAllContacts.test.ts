import { ContactRepositoryMock } from '../__mocks__/ContactRepositoryMock';
import { SearchAllContactsUseCase } from '../../../../src/core/Contact/application/SearchAllContacts';
import { AccountIdMother } from '../../Account/domain/AccountIdMother';
import { ContactMother } from '../domain/ContactMother';

const repository = new ContactRepositoryMock();
const searchAllContactsUseCase = new SearchAllContactsUseCase(repository);

describe('SearchAllCategories use case', () => {
  it('Should return all categories', async () => {
    const accountId = AccountIdMother.random();
    const contacts = [
      ContactMother.withAccount(accountId),
      ContactMother.withAccount(accountId),
      ContactMother.withAccount(accountId),
    ];

    repository.returnSearchAll(contacts);

    const expexctedCategories = await searchAllContactsUseCase.run(
      accountId.value
    );

    expect(repository.mockSearchAll).toHaveBeenCalledWith(accountId);
    expect(expexctedCategories).toEqual(contacts);
  });
});
