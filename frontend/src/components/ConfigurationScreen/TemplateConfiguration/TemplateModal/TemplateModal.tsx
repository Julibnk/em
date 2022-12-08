import { Modal, Props as ModalProps } from '../../../Shared/Modal/Modal';
import { TemplateForm } from './TemplateModalForm';
import { TemplateModalState } from './templateModalReducer';
import { ModalTitle, ModalTitleEntity } from '../../../Shared/Modal/ModalTitle';
import { Template } from '../../../../core/Template/Template';

export interface Props {
  state: TemplateModalState;
  handleClose: () => void;
  handleSubmit: (template: Template) => void;
}

export const TemplateModal = ({ state, handleClose, handleSubmit }: Props) => {
  const { opened, mode, template } = state;

  const modalProps: ModalProps = {
    opened: opened,
    onClose: handleClose,
    title: (
      <ModalTitle
        mode={mode}
        entity={ModalTitleEntity.TEMPLATE}
        subject={template?.name || ''}
      />
    ),
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
