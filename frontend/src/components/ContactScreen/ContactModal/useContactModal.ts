import { useCallback, useReducer } from 'react';
import { useTranslation } from '../../Shared/hooks/useTranslation';
import { Uuid } from '../../../core/Shared/Uuid';
import {
  initialState,
  contactModalReducer,
  ContactModalActionTypes,
} from './contactModalReducer';
import { showNotification } from '../../../core/Shared/Notification';
import { useContactScreenContext } from '../ContactScreenContext';
import { Contact } from '../../../core/Contact/Contact';
import { useContactTable } from '../ContactList/useContactTable';

export function useContactModal() {
  const t = useTranslation();

  // const is

  const { contactRepository } = useContactScreenContext();

  const { loadContacts } = useContactTable();

  const [contactModalState, dispatch] = useReducer(
    contactModalReducer,
    initialState
  );

  const add = useCallback(() => {
    const payload: Contact = {
      id: Uuid.create(),
      name: '',
      lastName: '',
      phone: {
        prefix: '',
        number: '',
      },
    };

    dispatch({
      type: ContactModalActionTypes.CREATE,
      payload,
    });
  }, []);

  const close = useCallback(() => {
    dispatch({ type: ContactModalActionTypes.CLOSE });
  }, []);

  const edit = useCallback(async (contactId: string) => {
    const contact = await contactRepository.searchById(contactId);

    if (contact)
      dispatch({ type: ContactModalActionTypes.EDIT, payload: contact });
  }, []);

  const submit = useCallback(async (contact: Contact) => {
    try {
      dispatch({ type: ContactModalActionTypes.LOADING, payload: true });
      await contactRepository.save(contact);
      dispatch({ type: ContactModalActionTypes.CLOSE });
      loadContacts();
    } catch (error) {
      showNotification({
        title: t('error'),
        message:
          error instanceof Error
            ? error.message
            : 'Ha ocurrido un error al guardar el contacto', //TODO traducir
        color: 'red',
      });
      dispatch({ type: ContactModalActionTypes.LOADING, payload: false });
    }
  }, []);

  return {
    contactModalState,
    add,
    close,
    submit,
    edit,
  };
}
