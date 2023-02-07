import { Button, Group, Modal, ModalProps } from '@mantine/core';
import { TemplateForm } from './TemplateModalForm';
import { TemplateModalState } from './templateModalReducer';
import { ModalTitle, ModalTitleEntity } from '../../../Shared/ModalTitle';
import { Template } from '../../../../core/Template/Template';
import { LoadingOverlay } from '../../../Shared/Loading';
import { SecondaryButton } from '../../../Shared/SecondaryButton';

import { useTranslation } from '../../../Shared/hooks/useTranslation';

import { IconFile, IconDeviceFloppy } from '@tabler/icons-react';

export interface Props {
  state: TemplateModalState;
  handleClose: () => void;
  handleSubmit: (template: Template) => void;
}

export const TemplateModal = ({ state, handleClose, handleSubmit }: Props) => {
  const t = useTranslation();
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

  const mainButtonIcon =
    mode === 'CREATE' ? <IconFile /> : <IconDeviceFloppy />;
  const mainButtonText = mode === 'CREATE' ? t('create') : t('save');

  return (
    <Modal {...modalProps}>
      <LoadingOverlay loading={loading} />
      <TemplateForm
        handleSubmit={handleSubmit}
        mode={mode}
        template={template}
      />
      <Group position='right' mt='md'>
        <SecondaryButton onClick={handleClose}>{t('cancel')}</SecondaryButton>
        <Button
          form='template-form'
          role={'submit'}
          type='submit'
          leftIcon={mainButtonIcon}
        >
          {mainButtonText}
        </Button>
      </Group>
    </Modal>
  );
};
