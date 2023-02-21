import { TemplateMessage } from '../../../core/TemplateMessage/TemplateMessage';
import { LoadingOverlay } from '../../Shared/Loading';
import { MessageForm } from './MessageModalForm';
import { MessageModalState } from './messageModalReducer';
import { Button, Group, Modal, ModalProps, Title } from '@mantine/core';
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
  const { opened, message, loading } = state;

  const modalProps: ModalProps = {
    opened: opened,
    onClose: handleClose,
    title: <Title order={3}>Enviar mensaje</Title>,
    size: 600,
  };

  if (!message) return null;

  return (
    <Modal {...modalProps}>
      <LoadingOverlay loading={loading} />
      <MessageForm handleSubmit={handleSubmit} message={message} />
      <Group position='right' mt='md'>
        <SecondaryButton onClick={handleClose}>
          Guardar sin enviar
        </SecondaryButton>
        <Button
          role={'submit'}
          form='message-form'
          type='submit'
          leftIcon={<IconSend />}
        >
          {t('send')}
        </Button>
      </Group>
    </Modal>
  );
};
