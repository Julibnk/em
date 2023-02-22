import { useState, useCallback } from 'react';
import { useContactScreenContext } from '../ContactScreenContext';
import { Contact } from '../../../core/Contact/Contact';

export function useContactTable() {
  const { contactRepository } = useContactScreenContext();

  const [contacts, setContacts] = useState<Contact[]>([]);

  const loadContacts = useCallback(async () => {
    const contacts = await contactRepository.searchAll();
    setContacts(contacts);
  }, [contactRepository]);

  return {
    contacts,
    loadContacts,
  };
}
