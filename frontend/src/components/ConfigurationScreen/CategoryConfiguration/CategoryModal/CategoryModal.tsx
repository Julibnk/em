import { CategoryModalState } from '../useCategoryModal';
import { Modal, Props as ModalProps } from '../../../Shared/Modal/Modal';
import { CategoryModalForm } from './CategoryModalForm';
import { ModalTitle } from '../../../Shared/Modal/ModalTitle';

export interface Props {
  state: CategoryModalState;
  handleClose: () => void;
  handleSubmit: () => void;
}

export const CategoryModal = ({ state, handleClose, handleSubmit }: Props) => {
  const { opened, mode, category, allTemplates } = state;

  const modalProps: ModalProps = {
    opened: opened,
    onClose: handleClose,
    title: <ModalTitle mode={mode} subject={category?.name || ''} />,
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
