import { TemplateMessageRepositoryMock } from '../__mocks__/TemplateMessageRepositoryMock';
import { SaveTemplateMessageUseCase } from '../../../../src/core/TemplateMessage/application/SaveTemplateMessage';
import { TemplateMessageMother } from '../domain/TemplateMessageMother';
import {
  TemplateMessageStatus,
  TemplateMessageStatuses,
} from '../../../../src/core/TemplateMessage/domain/value-object/TemplateMessageStatus';
import { AccountPhoneIdMother } from '../../AccountPhone/domain/AccountPhoneIdMother';
import { ContactIdMother } from '../../Contact/domain/ContactIdMother';
import { TemplateIdMother } from '../../Template/domain/TemplateIdMother';
import { TemplateMessageParameterMother } from '../domain/TemplateMessageParameterMother';
import { TemplateMessageScheduleDateMother } from '../domain/TemplateMessageScheduleDateMother';
import { TemplateMessageParameterInconsistentError } from '../../../../src/core/TemplateMessage/domain/exceptions/TemplateMessageParameterInconsistentError';
import { TemplateMessageScheduleError } from '../../../../src/core/TemplateMessage/domain/exceptions/TemplateMessageScheduleError';
import { TemplateMessageStatusError } from '../../../../src/core/TemplateMessage/domain/exceptions/TemplateMessageStatusError';

let repository: TemplateMessageRepositoryMock;
let saveTemplateMessageUseCase: SaveTemplateMessageUseCase;

describe('SaveTemplateMessage use case', () => {
  beforeEach(() => {
    repository = new TemplateMessageRepositoryMock();
    saveTemplateMessageUseCase = new SaveTemplateMessageUseCase(repository);
  });

  describe('=> New template message', () => {
    it('Should create a template message', async () => {
      const message = TemplateMessageMother.scheduled();

      const useCaseParams = { ...message.toPrimitives() };

      await saveTemplateMessageUseCase.run(useCaseParams);
      expect(repository.mockSave).toHaveBeenCalledWith(message);
    });

    it('Should throw exception if parameters are inconsistent', async () => {
      const message = TemplateMessageMother.draft();

      const useCaseParams = { ...message.toPrimitives() };

      useCaseParams.parameter2 = '';

      expect(
        async () => await saveTemplateMessageUseCase.run(useCaseParams)
      ).rejects.toThrow(TemplateMessageParameterInconsistentError);

      // Para no duplicar codigo, valido en el mismo test la modificacion
      repository.returnFindById(message);

      expect(
        async () => await saveTemplateMessageUseCase.run(useCaseParams)
      ).rejects.toThrow(TemplateMessageParameterInconsistentError);
    });

    it('Should throw exception if status is sent', async () => {
      const message = TemplateMessageMother.sent();

      const useCaseParams = { ...message.toPrimitives() };

      expect(
        async () => await saveTemplateMessageUseCase.run(useCaseParams)
      ).rejects.toThrow(TemplateMessageStatusError);

      //   // Para no duplicar codigo, valido en el mismo test la modificacion
      repository.returnFindById(message);

      expect(
        async () => await saveTemplateMessageUseCase.run(useCaseParams)
      ).rejects.toThrow(TemplateMessageStatusError);
    });

    it('Should throw exception if status is error', async () => {
      const message = TemplateMessageMother.inError();

      const useCaseParams = { ...message.toPrimitives() };

      expect(
        async () => await saveTemplateMessageUseCase.run(useCaseParams)
      ).rejects.toThrow(TemplateMessageStatusError);

      //   // Para no duplicar codigo, valido en el mismo test la modificacion
      repository.returnFindById(message);

      expect(
        async () => await saveTemplateMessageUseCase.run(useCaseParams)
      ).rejects.toThrow(TemplateMessageStatusError);
    });

    it('Should throw exception if shcedule data is inconsistent', async () => {
      const message = TemplateMessageMother.scheduled();

      const useCaseParams = { ...message.toPrimitives() };
      useCaseParams.scheduleDate = null;

      expect(
        async () => await saveTemplateMessageUseCase.run(useCaseParams)
      ).rejects.toThrow(TemplateMessageScheduleError);

      //   // Para no duplicar codigo, valido en el mismo test la modificacion
      repository.returnFindById(message);

      expect(
        async () => await saveTemplateMessageUseCase.run(useCaseParams)
      ).rejects.toThrow(TemplateMessageScheduleError);
    });
  });

  describe('=> Update template message', () => {
    it('Should update template message if already exists', async () => {
      const message = TemplateMessageMother.draft();

      repository.returnFindById(message);

      const originalMessage = TemplateMessageMother.makeCopy(message);
      const changedMessage = TemplateMessageMother.makeCopy(message);

      changedMessage.change(
        TemplateMessageStatus.fromValue(TemplateMessageStatuses.SCHEDULED),
        TemplateIdMother.random(),
        AccountPhoneIdMother.random(),
        ContactIdMother.random(),
        TemplateMessageParameterMother.random(),
        TemplateMessageParameterMother.random(),
        TemplateMessageParameterMother.random(),
        TemplateMessageScheduleDateMother.random()
      );

      const useCaseParams = { ...changedMessage.toPrimitives() };

      await saveTemplateMessageUseCase.run(useCaseParams);

      expect(repository.mockSave).toHaveBeenCalledWith(changedMessage);
      expect(repository.mockSave).not.toHaveBeenCalledWith(originalMessage);

      message.change = jest.fn();
      await saveTemplateMessageUseCase.run(useCaseParams);

      expect(message.change).toHaveBeenCalledWith(
        changedMessage.status,
        changedMessage.templateId,
        changedMessage.accountPhoneId,
        changedMessage.contactId,
        changedMessage.parameter1,
        changedMessage.parameter2,
        changedMessage.parameter3,
        changedMessage.scheduleDate
      );
    });
  });
});
