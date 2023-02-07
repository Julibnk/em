import { CategoryModalState } from './categoryModalReducer';
import { Modal, ModalProps } from '@mantine/core';
import { CategoryModalForm } from './CategoryModalForm';
import { ModalTitle, ModalTitleEntity } from '../../../Shared/ModalTitle';
import { CategoryOnlyIds } from '../../../../core/Category/Category';
import { LoadingOverlay } from '../../../Shared/Loading';

export interface Props {
  state: CategoryModalState;
  handleClose: () => void;
  handleSubmit: (category: CategoryOnlyIds) => void;
}

export const CategoryModal = ({ state, handleClose, handleSubmit }: Props) => {
  const { opened, mode, category, allTemplates, loading } = state;

  const modalProps: ModalProps = {
    opened: opened,
    onClose: handleClose,
    title: (
      <ModalTitle
        mode={mode}
        entity={ModalTitleEntity.CATEGORY}
        subject={category?.name || ''}
      />
    ),
  };

  if (!category) return null;

  return (
    <Modal {...modalProps}>
      <LoadingOverlay loading={loading} />
      <CategoryModalForm
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        mode={mode}
        category={category}
        allTemplates={allTemplates}
      />
    </Modal>
  );
};
