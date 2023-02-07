import { TemplateMessage } from '../../../core/TemplateMessage/TemplateMessage';
import { LoadingOverlay } from '../../Shared/Loading';
import { ModalTitle, ModalTitleEntity } from '../../Shared/ModalTitle';
import { MessageForm } from './MessageModalForm';
import { MessageModalState } from './messageModalReducer';
import { Button, Group, Modal, ModalProps } from '@mantine/core';
import { SecondaryButton } from '../../Shared/SecondaryButton';
import { useTranslation } from '../../Shared/hooks/useTranslation';
import { IconSend } from '@tabler/icons-react';

export interface Props {
  state: MessageModalState;
  handleClose: () => void;
  handleSubmit: (message: TemplateMessage) => void;
}

export const MessageModal = ({ state, handleClose, handleSubmit }: Props) => {
  const t = useTranslation();
  const { opened, mode, message, loading } = state;

  const modalProps: ModalProps = {
    opened: opened,
    onClose: handleClose,
    title: (
      <ModalTitle mode={mode} entity={ModalTitleEntity.MESSAGE} subject={''} />
    ),
    size: 600,
  };

  if (!message) return null;

  return (
    <Modal {...modalProps}>
      <LoadingOverlay loading={loading} />
      <MessageForm handleSubmit={handleSubmit} message={message} />
      <Group position='right' mt='md'>
        <SecondaryButton onClick={handleClose}>{t('cancel')}</SecondaryButton>
        <Button role={'submit'} type='submit' leftIcon={<IconSend />}>
          {t('send')}
        </Button>
      </Group>
    </Modal>
  );
};
