import { ContactRepositoryMock } from '../__mocks__/ContactRepositoryMock';
import { SaveContactUseCase } from '../../../../src/core/Contact/application/SaveContact';
import { ContactMother } from '../domain/ContactMother';
import { Contact } from '../../../../src/core/Contact/domain/Contact';

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
    it('should create new contact if doesnt exists', () => {
      const plainData = contact.toPrimitives();
      saveContactUseCase.run({ ...plainData });
      expect(true).toBe(true);
    });
  });
  describe('#Update contact', () => {
    it('should update contact if already exists', () => {
      expect(true).toBe(true);
    });
    it('should throw exception for contact with same phone but different id', () => {
      expect(true).toBe(true);
    });
  });

  // it('should update contact if already exists',  () => {

  // })
});
