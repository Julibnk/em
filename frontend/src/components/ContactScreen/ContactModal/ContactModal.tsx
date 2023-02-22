import { LoadingOverlay } from '../../Shared/Loading';
import { Button, Group, Modal, ModalProps, Title } from '@mantine/core';
import { SecondaryButton } from '../../Shared/SecondaryButton';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { ContactModalState } from './contactModalReducer';
import { Contact } from '../../../core/Contact/Contact';
import { ContactModalForm } from './ContactModalForm';

export interface Props {
  state: ContactModalState;
  handleClose: () => void;
  handleSubmit: (contact: Contact) => void;
}

export const ContactModal = ({ state, handleClose, handleSubmit }: Props) => {
  const { opened, contact, loading } = state;

  const modalProps: ModalProps = {
    opened: opened,
    onClose: handleClose,
    title: <Title order={3}>Contacto</Title>,
    size: 600,
  };

  if (!contact) return null;

  return (
    <Modal {...modalProps}>
      <LoadingOverlay loading={loading} />
      <ContactModalForm handleSubmit={handleSubmit} contact={contact} />
      <Group position='right' mt='md'>
        <SecondaryButton onClick={handleClose}>Cancelar</SecondaryButton>
        <Button
          role={'submit'}
          form='contact-form'
          type='submit'
          leftIcon={<IconDeviceFloppy />}
        >
          Guardar
        </Button>
      </Group>
    </Modal>
  );
};
