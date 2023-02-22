import { RestContactRepository } from '../../core/Contact/RestContactRepository';
import { ScreenContent } from '../Shared/Layout/ScreenContent';
import { ContactScreenProvider } from './ContactScreenContext';
import { ContactListHeader } from './ContactList/ContactListHeader';
import { ContactTable } from './ContactList/ContactTable';
import { useContactTable } from './ContactList/useContactTable';
import { useEffect } from 'react';

const ContactScreen = () => {
  const { contacts, loadContacts } = useContactTable();

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <ScreenContent>
      <ContactListHeader />
      <ContactTable
        contacts={contacts}
        handleEdit={() => {
          console.log('object');
        }}
      ></ContactTable>
      {/* <MessageListHeader handleAdd={add} handleLoad={openLoadModal} />
      <MessageTable messages={messages} handleEdit={edit} />
      <MessageModal
        state={messageModalState}
        handleClose={closeMessageModal}
        handleSubmit={submit}
      />
      <MessageFileModal
        state={messageFileModalState}
        handleClose={closeLoadModal}
      /> */}
    </ScreenContent>
  );
};

// export default ContactScreen;

const contactRepository = RestContactRepository.create();

const ContactScreenWrapper = () => {
  return (
    <ContactScreenProvider contactRepository={contactRepository}>
      <ContactScreen />
    </ContactScreenProvider>
  );
};

export default ContactScreenWrapper;
