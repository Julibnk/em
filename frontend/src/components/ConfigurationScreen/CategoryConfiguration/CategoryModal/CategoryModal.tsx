import { CategoryModalState } from './categoryModalReducer';
import { Button, Group, Modal, ModalProps } from '@mantine/core';
import { CategoryModalForm } from './CategoryModalForm';
import { ModalTitle, ModalTitleEntity } from '../../../Shared/ModalTitle';
import { CategoryOnlyIds } from '../../../../core/Category/Category';
import { LoadingOverlay } from '../../../Shared/Loading';
import { SecondaryButton } from '../../../Shared/SecondaryButton';
import { useTranslation } from '../../../Shared/hooks/useTranslation';

import { IconFile, IconDeviceFloppy } from '@tabler/icons-react';

export interface Props {
  state: CategoryModalState;
  handleClose: () => void;
  handleSubmit: (category: CategoryOnlyIds) => void;
}

export const CategoryModal = ({ state, handleClose, handleSubmit }: Props) => {
  const { opened, mode, category, allTemplates, loading } = state;
  const t = useTranslation();

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

  const mainButtonIcon =
    mode === 'CREATE' ? <IconFile /> : <IconDeviceFloppy />;
  const mainButtonText = mode === 'CREATE' ? t('create') : t('save');

  return (
    <Modal {...modalProps}>
      <LoadingOverlay loading={loading} />
      <CategoryModalForm
        // handleClose={handleClose}
        handleSubmit={handleSubmit}
        // mode={mode}
        category={category}
        allTemplates={allTemplates}
      />
      <Group position='right' mt='md'>
        <SecondaryButton onClick={handleClose}>{t('cancel')}</SecondaryButton>
        <Button type='submit' form='category-form' leftIcon={mainButtonIcon}>
          {mainButtonText}
        </Button>
      </Group>
    </Modal>
  );
};
