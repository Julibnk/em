import { Modal, ModalProps } from '@mantine/core';
import { TemplateForm } from './TemplateModalForm';
import { TemplateModalState } from './templateModalReducer';
import { ModalTitle, ModalTitleEntity } from '../../../Shared/ModalTitle';
import { Template } from '../../../../core/Template/Template';
import { LoadingOverlay } from '../../../Shared/Loading';

export interface Props {
  state: TemplateModalState;
  handleClose: () => void;
  handleSubmit: (template: Template) => void;
}

export const TemplateModal = ({ state, handleClose, handleSubmit }: Props) => {
  const { opened, mode, template, loading } = state;

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
  };

  if (!template) return null;

  return (
    <Modal {...modalProps}>
      <LoadingOverlay loading={loading} />
      <TemplateForm
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        mode={mode}
        template={template}
      />
    </Modal>
  );
};
