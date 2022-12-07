import { useCallback } from 'react';
import { ModalProps } from '@mantine/core';

// import { Modal } from '@mantine/core';
import { Modal } from '../../../Shared/Modal/Modal';
import { CategoryForm } from './form';
import { setModalOpenend } from '../../../Shared/Layout/layout-slice';
import { useSelector, useDispatch } from '../../../../config/store';
import { selectModal } from '../../../Shared/Layout/layout-selector';
import { t } from 'i18next';
import { selectSelectedCategory } from '../../../../Category/category-selector';

import { ModalMode } from '../../../Shared/Layout/layout-slice';

export const CategoryModal = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => selectModal(state, 'category'));
  const category = useSelector((state) => selectSelectedCategory(state));

  const { opened, mode } = modalState;

  const handleOnClose = useCallback(() => {
    dispatch(setModalOpenend({ modal: 'category', opened: false }));
  }, [dispatch]);

  const modalProps: ModalProps = {
    opened: opened,
    onClose: handleOnClose,
    title: getModalTitle(mode, category?.name || ''),
  };

  return (
    <Modal {...modalProps}>
      <CategoryForm handleOnClose={handleOnClose} />
    </Modal>
  );
};

function getModalTitle(mode: ModalMode, categoryName: string): string {
  if (mode === 'edit') {
    return t('edit_subject', { subject: categoryName });
  }

  return t('create_subject', { subject: t('category', { count: 1 }) });
}
