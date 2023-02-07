import { CategoryModalState } from './categoryModalReducer';
import { Button, Group, Modal, ModalProps } from '@mantine/core';
import { CategoryModalForm } from './CategoryModalForm';
import { ModalTitle, ModalTitleEntity } from '../../../Shared/ModalTitle';
import { CategoryOnlyIds } from '../../../../core/Category/Category';
import { LoadingOverlay } from '../../../Shared/Loading';
import { SecondaryButton } from '../../../Shared/SecondaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from '../../../Shared/hooks/useTranslation';

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

  const mainButtonIcon = mode === 'CREATE' ? faFile : faFloppyDisk;
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
        <Button
          type='submit'
          form='category-form'
          leftIcon={<FontAwesomeIcon icon={mainButtonIcon} />}
        >
          {mainButtonText}
        </Button>
      </Group>
    </Modal>
  );
};
