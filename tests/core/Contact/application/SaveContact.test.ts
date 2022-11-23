import { ContactRepositoryMock } from '../__mocks__/ContactRepositoryMock';
import { SaveContactUseCase } from '../../../../src/core/Contact/application/SaveContact';
import { ContactMother } from '../domain/ContactMother';
import { Contact } from '../../../../src/core/Contact/domain/Contact';
import { ContactLastNameMother } from '../domain/ContactLastNameMother';
import { ContactNameMother } from '../domain/ContactNameMother';
import { ContactIdMother } from '../domain/ContactIdMother';
import { InconsistentContactError } from '../../../../src/core/Contact/domain/exceptions/InconsistentContactError';

let repository: ContactRepositoryMock;
let saveContactUseCase: SaveContactUseCase;
let contact: Contact;

describe('SaveContact use case', () => {
  beforeEach(() => {
    repository = new ContactRepositoryMock();
    saveContactUseCase = new SaveContactUseCase(repository);
    contact = ContactMother.random();
  });

  describe('#Create contact', () => {
    it('should create new contact if doesnt exists', async () => {
      const useCaseParams = { ...contact.toPrimitives() };
      await saveContactUseCase.run(useCaseParams);
      expect(repository.mockSave).toHaveBeenCalledWith(contact);
    });
  });

  describe('#Update contact', () => {
    beforeEach(() => {
      repository.returnFindByPhone(contact);
    });

    it('should update contact if already exists', async () => {
      const originalContact = ContactMother.makeCopy(contact);
      contact.change(
        ContactNameMother.random(),
        ContactLastNameMother.random()
      );

      const useCaseParams = { ...contact.toPrimitives() };

      await saveContactUseCase.run(useCaseParams);
      expect(repository.mockSave).toHaveBeenCalledWith(contact);
      expect(repository.mockSave).not.toHaveBeenCalledWith(originalContact);
    });

    it('should throw exception for contact with same phone but different id', async () => {
      const useCaseParams = { ...contact.toPrimitives() };
      useCaseParams.id = ContactIdMother.random().value;

      expect(
        async () => await saveContactUseCase.run(useCaseParams)
      ).rejects.toThrow(InconsistentContactError);
    });
  });
});
