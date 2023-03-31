import { useContactScreenContext } from '../ContactScreenContext';
import { Contact } from '../../../core/Contact/Contact';

// import { Nullable } from 'vitest';
import { ModalMode } from './useContactModal';
import { Nullable } from '../../../core/Shared/Nullable';
import { useMutation, useQuery } from '@tanstack/react-query';
import { showNotification } from '../../../core/Shared/Notification';
// import { ModalMode } from '../../Shared/ModalTitle';

interface Props {
  id: Nullable<string>;
  mode: Nullable<ModalMode>;
}

export function useContactModalQuery({ id, mode }: Props) {
  const { contactRepository } = useContactScreenContext();

  const { mutate: saveContact, isLoading: isSaving } = useMutation({
    mutationFn: (contact: Contact) => contactRepository.save(contact),
    onSuccess: () => {
      showNotification(
        'save_penalties_success_t',
        'save_penalties_success',
        'SUCCESS'
      );
    },
    onError: () => {
      showNotification('save_penalties_error_t', 'save_penalties_error');
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ['contact', id],
    queryFn: () => {
      if (!id) return null;

      if (mode === ModalMode.ADD) {
        return Contact.createEmpty(id);
      }

      return contactRepository.searchById(id);
    },
  });

  return {
    saveContact,
    isSaving,
    isLoading,
    data,
  };
}
