import styles from './styles.module.css';
import { Table, Th } from '../../Shared/MantineOverwrite/Table';
import { useDispatch, useSelector } from '../../../config/store';
import { selectAllTemplates } from '../../../Template/template-selector';
import { init } from '../../../Template/template-slice';
import { useEffect } from 'react';
import { TemplateTableRow } from './row';
import { useTranslation } from '../../../Shared/hooks/useTranslation';

export const TemplateTable = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  const templates = useSelector((state) => selectAllTemplates(state));
  const t = useTranslation();

  return (
    <Table className={styles.table}>
      <thead>
        <tr>
          <Th>{t('name')}</Th>
          <Th>{t('preview')}</Th>
          <Th textAlign='center'>{t('variable', { plural: true })}</Th>
          <Th textAlign='center'>{t('category', { plural: true })}</Th>
          <Th textAlign='center'>{t('actions')}</Th>
        </tr>
      </thead>
      <tbody>
        {templates.map((template) => (
          <TemplateTableRow key={template.id} template={template} />
        ))}
      </tbody>
    </Table>
  );
};
