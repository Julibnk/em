import { useCallback } from 'react';
import { ModalProps } from '@mantine/core';

import { Modal } from '../../../../Shared/MantineOverwrite/Modal';
import { ModalMode, setModalOpenend } from '../../layout-slice';
import { useSelector, useDispatch } from '../../../../../config/store';
import { TemplateForm } from './form';
import { t } from 'i18next';
import { selectModal } from '../../layout-selector';
import { selectSelectedTemplate } from '../../../../../Template/template-selector';

export const TemplateModal = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => selectModal(state, 'template'));
  const template = useSelector((state) => selectSelectedTemplate(state));

  const { opened, mode } = modalState;

  const handleOnClose = useCallback(() => {
    dispatch(setModalOpenend({ modal: 'template', opened: false }));
  }, [dispatch]);

  const modalProps: ModalProps = {
    opened: opened,
    onClose: handleOnClose,
    title: getModalTitle(mode, template?.name || ''),
    size: 600,
  };

  return (
    <Modal {...modalProps}>
      <TemplateForm handleOnClose={handleOnClose} />
    </Modal>
  );
};

function getModalTitle(mode: ModalMode, templateName: string): string {
  if (mode === 'edit') {
    return t('edit_subject', { subject: templateName });
  }

  return t('create_subject', { subject: t('template', { count: 1 }) });
}
