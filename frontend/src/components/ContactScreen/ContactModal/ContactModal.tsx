import { LoadingOverlay } from '../../Shared/Loading';
import { Button, Group, Modal, ModalProps, Title } from '@mantine/core';
import { SecondaryButton } from '../../Shared/SecondaryButton';
import { IconDeviceFloppy } from '@tabler/icons-react';
// import { ContactModalState } from './contactModalReducer';
import { Contact } from '../../../core/Contact/Contact';
import { ContactModalForm } from './ContactModalForm';
import { Nullable } from '../../../core/Shared/Nullable';
import { useContactModal } from './useContactModal';

export interface Props {
  loading: boolean;
  opened: boolean;
  contact: Nullable<Contact>;
  handleClose: () => void;
  handleSubmit: (contact: Contact) => void;
}

export const ContactModal = ({
  loading,
  opened,
  contact,
  handleClose,
  handleSubmit,
}: Props) => {
  // const {
  //   add,
  //   submit,
  //   edit,
  //   close,
  //   loading,
  //   modalState: { opened },
  // } = useContactModal();

  const modalProps: ModalProps = {
    opened,
    onClose: close,
    title: <Title order={3}>Contacto</Title>,
    size: 600,
  };

  // const { contact } = useContactModal();

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
