import { useContactScreenContext } from '../ContactScreenContext';
import useSWR from 'swr';

export function useContactTable() {
  const { contactRepository } = useContactScreenContext();

  const {
    data: contacts,
    isLoading: loading,
    mutate: loadContacts,
  } = useSWR('contacts', () => contactRepository.searchAll());

  return {
    contacts,
    loading,
    loadContacts,
  };
}
