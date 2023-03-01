import { useCallback, useReducer, useState, useEffect } from 'react';
import { useTranslation } from '../../Shared/hooks/useTranslation';
import { Uuid } from '../../../core/Shared/Uuid';
import {
  initialState,
  contactModalReducer,
  ContactModalActionTypes,
} from './contactModalReducer';
import { useContactScreenContext } from '../ContactScreenContext';
import { Contact } from '../../../core/Contact/Contact';
import { useContactTable } from '../ContactList/useContactTable';
import useSWRMutation, {
  MutationFetcher,
  SWRMutationConfiguration,
} from 'swr/mutation';
import { apiErrorNotification } from '../../../core/Shared/Notification';
import useSWR, { Fetcher, Key } from 'swr';
import { Nullable } from 'vitest';

const enum ModalMode {
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

export function useContactModal() {
  const t = useTranslation();

  const { contactRepository } = useContactScreenContext();

  const [modalState, setModalState] =
    useState<ContactModalState>(initialModalState);

  const saveFetcher: MutationFetcher<void, Contact, string> = (
    _url,
    { arg: contact }
  ) => contactRepository.save(contact);

  const { trigger: saveContact, isMutating: mutating } = useSWRMutation(
    'contact',
    saveFetcher
  );

  const { contactId, mode } = modalState;

  const contactKey = contactId && mode ? ['contact', contactId, mode] : null;

  const { data: contact, isLoading: loading } = useSWR<
    Contact,
    string,
    Nullable<string[]>
  >(contactKey, ([_url, id, mode]) => {
    if (mode === ModalMode.ADD) {
      const newContact: Contact = {
        id,
        name: '',
        lastName: '',
        phone: {
          prefix: '',
          number: '',
        },
      };
      return newContact;
    }

    return contactRepository.searchById(id);
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
    } catch (error) {
      apiErrorNotification(error);
    }
  }, []);

  return {
    contact,
    loading,
    add,
    close,
    submit,
    edit,
    mutating,
    modalState,
  };
}
