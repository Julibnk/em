import { Modal, Props as ModalProps } from '../../../Shared/Modal/Modal';
import { TemplateForm } from './TemplateModalForm';
import { TemplateModalState } from '../useTemplateModal';
import { ModalTitle } from '../../../Shared/Modal/ModalTitle';

export interface Props {
  state: TemplateModalState;
  handleClose: () => void;
  handleSubmit: () => void;
}

export const TemplateModal = ({ state, handleClose, handleSubmit }: Props) => {
  const { opened, mode, template } = state;

  const modalProps: ModalProps = {
    opened: opened,
    onClose: handleClose,
    title: <ModalTitle mode={mode} subject={template?.name || ''} />,
    size: 600,
    loading: state.loading,
  };

  if (!template) return null;

  return (
    <Modal {...modalProps}>
      <TemplateForm
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        mode={mode}
        template={template}
      />
    </Modal>
  );
};
