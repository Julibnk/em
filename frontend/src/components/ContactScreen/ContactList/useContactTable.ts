import { useQuery } from '@tanstack/react-query';
import { useContactScreenContext } from '../ContactScreenContext';

export function useContactTable() {
  const { contactRepository } = useContactScreenContext();

  const {
    data: contacts,
    isLoading: loading,
    refetch: loadContacts,
  } = useQuery({
    queryKey: ['contacts'],
    queryFn: () => contactRepository.searchAll(),
  });

  return {
    contacts,
    loading,
    loadContacts,
  };
}
