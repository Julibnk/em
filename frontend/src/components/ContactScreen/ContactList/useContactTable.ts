import { useState, useCallback } from 'react';
import { useContactScreenContext } from '../ContactScreenContext';
import { Contact } from '../../../core/Contact/Contact';
import useSWR from 'swr';

export function useContactTable() {
  const { contactRepository } = useContactScreenContext();

  const {
    data: contacts,
    isLoading,
    mutate: loadContacts,
  } = useSWR('contacts', () => contactRepository.searchAll());

  // const [contacts, setContacts] = useState<Contact[]>([]);

  // const loadContacts = useCallback(async () => {
  //   const contacts = await contactRepository.searchAll();
  //   setContacts(contacts);
  // }, [contactRepository]);

  return {
    contacts,
    isLoading,
    loadContacts,
  };
}
