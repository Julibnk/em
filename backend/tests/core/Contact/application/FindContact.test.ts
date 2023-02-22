import { FindContactUseCase } from '../../../../src/core/Contact/application/FindContact';
import { Contact } from '../../../../src/core/Contact/domain/Contact';
import { ContactRepositoryMock } from '../__mocks__/ContactRepositoryMock';
import { ContactMother } from '../domain/ContactMother';
import { ContactNotFoundError } from '../../../../src/core/Contact/domain/exceptions/ContactNotFoundError';

let repository: ContactRepositoryMock;
let findContactUseCase: FindContactUseCase;
let contact: Contact;

describe('FindContact use case', () => {
  beforeEach(() => {
    repository = new ContactRepositoryMock();
    findContactUseCase = new FindContactUseCase(repository);
    contact = ContactMother.random();
  });

  it('Repository should be called with account and contact id', async () => {
    repository.returnFindById(contact);

    await findContactUseCase.run(contact.accountId.value, contact.id.value);

    expect(repository.mockFindById).toHaveBeenCalledWith(
      contact.accountId,
      contact.id
    );
  });

  it('Should throw exception when contact doesnt exists', async () => {
    expect(
      async () =>
        await findContactUseCase.run(contact.accountId.value, contact.id.value)
    ).rejects.toThrow(ContactNotFoundError);
  });
});
