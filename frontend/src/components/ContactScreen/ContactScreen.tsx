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
  const { isLoading } = useContactTable();

  const { contactModalState, add, close, submit, edit } = useContactModal();

  return (
    <ScreenContent>
      <LoadingOverlay loading={isLoading} />
      <ContactListHeader handleAdd={add} />
      <ContactTable handleEdit={edit} />
      <ContactModal
        state={contactModalState}
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
