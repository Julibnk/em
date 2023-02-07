import { TemplateMessage } from '../../../core/TemplateMessage/TemplateMessage';
import { LoadingOverlay } from '../../Shared/Loading';
import { ModalTitle, ModalTitleEntity } from '../../Shared/ModalTitle';
import { MessageForm } from './MessageModalForm';
import { MessageModalState } from './messageModalReducer';
import { Modal, ModalProps } from '@mantine/core';

export interface Props {
  state: MessageModalState;
  handleClose: () => void;
  handleSubmit: (message: TemplateMessage) => void;
}

export const MessageModal = ({ state, handleClose, handleSubmit }: Props) => {
  const { opened, mode, message, loading } = state;

  const modalProps: ModalProps = {
    opened: opened,
    onClose: handleClose,
    title: (
      <ModalTitle mode={mode} entity={ModalTitleEntity.MESSAGE} subject={''} />
    ),
    size: 600,
  };

  if (!message) return null;

  return (
    <Modal {...modalProps}>
      <LoadingOverlay loading={loading} />
      <MessageForm
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        mode={mode}
        message={message}
      />
    </Modal>
  );
};
