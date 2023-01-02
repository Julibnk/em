import { TemplateMessage } from '../../../core/TemplateMessage/TemplateMessage';
import { Modal, Props as ModalProps } from '../../Shared/Modal/Modal';
import { ModalTitle, ModalTitleEntity } from '../../Shared/Modal/ModalTitle';
import { MessageForm } from './MessageModalForm';
import { MessageModalState } from './messageModalReducer';
// import { MessageForm } from '../../Shared/Layout/Modals/MessageModal/MessageModalForm';

export interface Props {
  state: MessageModalState;
  handleClose: () => void;
  handleSubmit: (message: TemplateMessage) => void;
}

export const MessageModal = ({ state, handleClose, handleSubmit }: Props) => {
  const { opened, mode, message } = state;

  const modalProps: ModalProps = {
    opened: opened,
    onClose: handleClose,
    title: (
      <ModalTitle mode={mode} entity={ModalTitleEntity.MESSAGE} subject={''} />
    ),
    size: 600,
    loading: state.loading,
  };

  if (!message) return null;

  return (
    <Modal {...modalProps}>
      <MessageForm
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        mode={mode}
        message={message}
      />
    </Modal>
  );
};
