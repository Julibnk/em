import { FindTemplateMessageUseCase } from '../../../../src/core/TemplateMessage/application/FindTemplateMessage';
import { TemplateMessageRepositoryMock } from '../__mocks__/TemplateMessageRepositoryMock';
import { TemplateMessage } from '../../../../src/core/TemplateMessage/domain/TemplateMessage';
import { TemplateMessageMother } from '../domain/TemplateMessageMother';
import { TemplateMessageNotFoundError } from '../../../../src/core/TemplateMessage/domain/exceptions/TemplateMessageNotFoundError';

let repository: TemplateMessageRepositoryMock;
let findTemplateMessageUseCase: FindTemplateMessageUseCase;
let message: TemplateMessage;

describe('FindTemplateMessage use case', () => {
  beforeEach(() => {
    repository = new TemplateMessageRepositoryMock();
    findTemplateMessageUseCase = new FindTemplateMessageUseCase(repository);
    message = TemplateMessageMother.random();
  });

  it('Repository should be called with account and message id', async () => {
    repository.returnFindById(message);

    await findTemplateMessageUseCase.run(
      message.accountId.value,
      message.id.value
    );

    expect(repository.mockFindById).toHaveBeenCalledWith(
      message.accountId,
      message.id
    );
  });

  it('Should throw error if message doesnt exist', () => {
    expect(
      async () =>
        await findTemplateMessageUseCase.run(
          message.accountId.value,
          message.id.value
        )
    ).rejects.toThrow(TemplateMessageNotFoundError);
  });
});
