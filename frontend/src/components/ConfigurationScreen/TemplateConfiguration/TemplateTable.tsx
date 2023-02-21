import styles from './styles.module.css';
import { TemplateTableRow } from './TemplateTableRow';
import { useTranslation } from '../../Shared/hooks/useTranslation';
import { Template } from '../../../core/Template/Template';
import { Table } from '@mantine/core';

export interface Props {
  templates: Template[];
  handleEdit: (templateId: string) => void;
  handleDelete: (templateId: string) => void;
}

export const TemplateTable = ({
  templates,
  handleDelete,
  handleEdit,
}: Props) => {
  const t = useTranslation();

  return (
    <Table>
      <thead>
        <tr>
          <th>{t('name')}</th>
          <th>{t('preview')}</th>
          <th>{t('variable', { plural: true })}</th>
          <th>{t('actions')}</th>
        </tr>
      </thead>
      <tbody className={`${styles.tbody}`}>
        {templates.map((template) => (
          <TemplateTableRow
            key={template.id}
            template={template}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </tbody>
    </Table>
  );
};
