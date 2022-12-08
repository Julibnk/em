import { CategoryModalState } from './categoryModalReducer';
import { Modal, Props as ModalProps } from '../../../Shared/Modal/Modal';
import { CategoryModalForm } from './CategoryModalForm';
import { ModalTitle, ModalTitleEntity } from '../../../Shared/Modal/ModalTitle';
import { CategoryOnlyIds } from '../../../../core/Category/Category';

export interface Props {
  state: CategoryModalState;
  handleClose: () => void;
  handleSubmit: (category: CategoryOnlyIds) => void;
}

export const CategoryModal = ({ state, handleClose, handleSubmit }: Props) => {
  const { opened, mode, category, allTemplates } = state;

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
    loading: state.loading,
  };

  if (!category) return null;

  return (
    <Modal {...modalProps}>
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
