import styles from './styles.module.css';
import { Table, Th } from '../../Shared/MantineOverwrite/Table';
import { useDispatch, useSelector } from '../../../config/store';
import { selectAllTemplates } from '../../../Template/template-selector';
import { init } from '../../../Template/template-slice';
import { useEffect, useState } from 'react';
import { TemplateTableRow } from './row';
import { useTranslation } from '../../../Shared/hooks/useTranslation';
import { RestCategoryRespository } from '../../../Category/RestCategoryRepository';
import { Template } from '../../../Template/Template';
import { RestTemplateRepository } from '../../../Template/RestTemplateRepository';

const repository = new RestTemplateRepository();

export const TemplateTable = () => {
  const t = useTranslation();
  // const dispatch = useDispatch();

  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    repository.searchAll().then((templates) => {
      setTemplates(templates);
    });
    // setTemplates();
    // const templates = repository.searchAll();
  }, []);

  // useEffect(() => {
  //   dispatch(init());
  // }, [dispatch]);

  // const templates = useSelector((state) => selectAllTemplates(state));

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
