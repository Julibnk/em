import { useCallback, useState } from 'react';
import { Uuid } from '../../../core/Shared/Uuid';

import { Contact } from '../../../core/Contact/Contact';

import { apiErrorNotification } from '../../../core/Shared/Notification';
import { Nullable } from 'vitest';
import { useContactModalQuery } from './useContactModalQuery';

export const enum ModalMode {
  ADD = 'ADD',
  EDIT = 'EDIT',
}

interface ContactModalState {
  opened: boolean;
  contactId: Nullable<string>;
  mode: Nullable<ModalMode>;
}

const initialModalState: ContactModalState = {
  opened: false,
  contactId: null,
  mode: null,
};

type GetFetcherKey = Nullable<{
  url: string;
  args: { id: string; mode: ModalMode };
}>;

export function useContactModal() {
  // const { mutate } = useSWRConfig();

  const [modalState, setModalState] =
    useState<ContactModalState>(initialModalState);

  const { contactId, mode } = modalState;

  const {
    saveContact,
    isSaving,
    isLoading,
    data: contact,
  } = useContactModalQuery({
    id: contactId,
    mode,
  });

  const add = useCallback(() => {
    setModalState({
      opened: true,
      contactId: Uuid.create(),
      mode: ModalMode.ADD,
    });
  }, []);

  const close = useCallback(() => {
    setModalState(initialModalState);
  }, []);

  const edit = useCallback((contactId: string) => {
    setModalState({ opened: true, contactId, mode: ModalMode.EDIT });
  }, []);

  const submit = useCallback(async (contact: Contact) => {
    try {
      await saveContact(contact);
      close();
      // mutate('contacts');
    } catch (error) {
      apiErrorNotification(error);
    }
  }, []);

  return {
    contact,
    isLoading,
    add,
    close,
    submit,
    edit,
    isSaving,
    modalState,
  };
}
