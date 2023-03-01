import { RestContactRepository } from '../../core/Contact/RestContactRepository';
import { ScreenContent } from '../Shared/Layout/ScreenContent';
import { ContactScreenProvider } from './ContactScreenContext';
import { ContactListHeader } from './ContactList/ContactListHeader';
import { ContactTable } from './ContactList/ContactTable';
import { useContactTable } from './ContactList/useContactTable';
import { useContactModal } from './ContactModal/useContactModal';
import { ContactModal } from './ContactModal/ContactModal';
import { LoadingOverlay } from '../Shared/Loading';

const ContactScreen = () => {
  const { loading: tableLoading } = useContactTable();

  const {
    add,
    submit,
    edit,
    close,
    loading: modalLoading,
    modalState: { opened },
    contact,
  } = useContactModal();

  return (
    <ScreenContent>
      <LoadingOverlay loading={tableLoading} />
      <ContactListHeader handleAdd={add} />
      <ContactTable handleEdit={edit} />
      <ContactModal
        opened={opened}
        loading={modalLoading}
        contact={contact}
        handleClose={close}
        handleSubmit={submit}
      />
    </ScreenContent>
  );
};

const contactRepository = RestContactRepository.create();

const ContactScreenWrapper = () => {
  return (
    <ContactScreenProvider contactRepository={contactRepository}>
      <ContactScreen />
    </ContactScreenProvider>
  );
};

export default ContactScreenWrapper;
