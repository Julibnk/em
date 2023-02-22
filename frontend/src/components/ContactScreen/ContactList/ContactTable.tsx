import styles from './styles.module.css';
import { useTranslation } from '../../Shared/hooks/useTranslation';
import { Table } from '@mantine/core';
import { Contact } from '../../../core/Contact/Contact';
import { ContactTableRow } from './ContactTableRow';

export interface Props {
  contacts: Contact[];
  handleEdit: (contactId: string) => void;
}

export const ContactTable = ({ contacts, handleEdit }: Props) => {
  const t = useTranslation();

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
