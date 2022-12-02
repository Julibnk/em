import { useCallback } from 'react';
import { ModalProps } from '@mantine/core';

// import { Modal } from '@mantine/core';
import { Modal } from '../../../../shared/MantineOverwrite/Modal';
import { CategoryForm } from './form';
import { setModalOpenend } from '../../../../../store/layout-slice';
import { useSelector, useDispatch } from '../../../../../store/store';
import { selectModal } from '../../../../../store/layout-selector';
import { t } from 'i18next';
import { selectSelectedCategory } from '../../../../../Category/category-selector';

import { ModalMode } from '../../../../../store/layout-slice';

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
