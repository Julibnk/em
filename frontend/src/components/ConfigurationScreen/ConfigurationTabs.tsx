import styles from './styles.module.css';

import { Tabs, TabsProps } from '@mantine/core';
import { useTranslation } from '../../Shared/hooks/useTranslation';
import { CategoryConfiguration } from './CategoryConfiguration/CategoryConfiguration';
import { TemplateConfiguration } from './TemplateConfiguration/TemplateConfiguration';
import { RestTemplateRepository } from '../../Template/RestTemplateRepository';
import { RestCategoryRespository } from '../../Category/RestCategoryRepository';

const templateRepository = new RestTemplateRepository();
const categoryRepository = new RestCategoryRespository();

export const ConfigurationTabs = () => {
  const t = useTranslation();
  const tabsProps: TabsProps = {
    children: <></>,
    classNames: { tab: styles.tab, panel: styles.panel },
    defaultValue: 'category',
  };

  return (
    <Tabs {...tabsProps}>
      <Tabs.List>
        <Tabs.Tab value='category'>{t('category', { plural: true })}</Tabs.Tab>
        <Tabs.Tab value='template'>
          {t('whatsappTemplate', { plural: true })}
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value='category'>
        <CategoryConfiguration
          repository={categoryRepository}
          templateRepository={templateRepository}
        />
      </Tabs.Panel>

      <Tabs.Panel value='template'>
        <TemplateConfiguration repository={templateRepository} />
      </Tabs.Panel>
    </Tabs>
  );
};
