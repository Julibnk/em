import { RestContactRepository } from '../../core/Contact/RestContactRepository';
import { ScreenContent } from '../Shared/Layout/ScreenContent';
import { ContactScreenProvider } from './ContactScreenContext';
import { ContactListHeader } from './ContactList/ContactListHeader';
import { ContactTable } from './ContactList/ContactTable';
import { useContactTable } from './ContactList/useContactTable';
import { useCallback, useEffect } from 'react';
import { useContactModal } from './ContactModal/useContactModal';
import { ContactModal } from './ContactModal/ContactModal';

const ContactScreen = () => {
  const { contacts, loadContacts } = useContactTable();

  const onSubmitSuccess = useCallback(() => {
    loadMessages();
  }, []);

  const { contactModalState, add, close, submit, edit } =
    useContactModal(onSubmitSuccess);

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <ScreenContent>
      <ContactListHeader handleAdd={add} />
      <ContactTable contacts={contacts} handleEdit={edit} />
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
function loadMessages() {
  throw new Error('Function not implemented.');
}
