import styles from './styles.module.css';
import { Table, Th } from '../../shared/MantineOverwrite/Table';
import { useDispatch, useSelector } from '../../../store/store';
import { selectAllTemplates } from '../../../store/template-selector';
import { init } from '../../../store/template-slice';
import { useEffect } from 'react';
import { TemplateTableRow } from './row';
import { useTranslation } from '../../../hooks/useTranslation';

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
