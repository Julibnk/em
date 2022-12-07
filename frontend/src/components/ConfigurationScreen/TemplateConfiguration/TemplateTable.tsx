import styles from './styles.module.css';
import { Table, Th } from '../../Shared/Table';
import { TemplateTableRow } from './TemplateTableRow';
import { useTranslation } from '../../../core/Shared/hooks/useTranslation';
import { Template } from '../../../core/Template/Template';

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
    <Table className={styles.table}>
      <thead>
        <tr>
          <Th>{t('name')}</Th>
          <Th>{t('preview')}</Th>
          <Th textAlign='center'>{t('variable', { plural: true })}</Th>
          {/* <Th textAlign='center'>{t('category', { plural: true })}</Th> */}
          <Th textAlign='center'>{t('actions')}</Th>
        </tr>
      </thead>
      <tbody>
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
