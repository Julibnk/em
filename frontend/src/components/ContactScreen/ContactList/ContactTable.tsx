import styles from './styles.module.css';
import { useTranslation } from '../../Shared/hooks/useTranslation';
import { Table } from '@mantine/core';
import { Contact } from '../../../core/Contact/Contact';
import { ContactTableRow } from './ContactTableRow';
import { useContactTable } from './useContactTable';
import { Nullable } from '../../../core/Shared/Nullable';

export interface Props {
  contacts: Nullable<Contact[]>;
  handleEdit: (contactId: string) => void;
}

export const ContactTable = ({ handleEdit, contacts }: Props) => {
  const t = useTranslation();

  if (!contacts) {
    return null;
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellidos</th>
          <th>Telefono</th>
          <th className={styles.textCenter}>{t('actions')}</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact) => (
          <ContactTableRow
            key={contact.id}
            contact={contact}
            handleEdit={handleEdit}
          />
        ))}
      </tbody>
    </Table>
  );
};
