import { ContactRepositoryMock } from '../__mocks__/ContactRepositoryMock';
import { SaveContactUseCase } from '../../../../src/core/Contact/application/SaveContact';
import { ContactMother } from '../domain/ContactMother';
import { Contact } from '../../../../src/core/Contact/domain/Contact';
import { ContactLastNameMother } from '../domain/ContactLastNameMother';
import { ContactNameMother } from '../domain/ContactNameMother';
import { SamePhoneContactExistsError } from '../../../../src/core/Contact/domain/exceptions/SamePhoneContactExistsError';

let repository: ContactRepositoryMock;
let saveContactUseCase: SaveContactUseCase;
let contact: Contact;

describe('SaveContact use case', () => {
  beforeEach(() => {
    repository = new ContactRepositoryMock();
    saveContactUseCase = new SaveContactUseCase(repository);
    contact = ContactMother.random();
  });

  describe('=> Create contact', () => {
    it('should create new contact if doesnt exists', async () => {
      const useCaseParams = { ...contact.toPrimitives() };
      await saveContactUseCase.run(useCaseParams);
      expect(repository.mockSave).toHaveBeenCalledWith(contact);
    });
  });

  describe('=> Update contact', () => {
    it('should update contact if already exists', async () => {
      const originalContact = ContactMother.makeCopy(contact);
      repository.returnFindById(originalContact);

      contact.change(
        ContactNameMother.random(),
        ContactLastNameMother.random()
      );

      const useCaseParams = { ...contact.toPrimitives() };
      await saveContactUseCase.run(useCaseParams);

      expect(repository.mockSave).toHaveBeenCalledWith(contact);
      expect(repository.mockSave).not.toHaveBeenCalledWith(originalContact);
    });

    it('should throw exception If same phone contact exists', async () => {
      repository.returnFindByPhone(contact);
      const useCaseParams = { ...contact.toPrimitives() };
      expect(
        async () => await saveContactUseCase.run(useCaseParams)
      ).rejects.toThrow(SamePhoneContactExistsError);
    });
  });
});
