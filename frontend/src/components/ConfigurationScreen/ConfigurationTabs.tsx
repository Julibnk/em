import styles from './styles.module.css';

import { Tabs, TabsProps } from '@mantine/core';
import { useTranslation } from '../../Shared/hooks/useTranslation';
import { CategoryConfiguration } from './CategoryConfiguration/CategoryConfiguration';
import { TemplateConfiguration } from './TemplateConfiguration/TemplateConfiguration';
import { RestTemplateRepository } from '../../Template/RestTemplateRepository';

const repository = new RestTemplateRepository();

export const ConfigurationTabs = () => {
  const t = useTranslation();
  const tabsProps: TabsProps = {
    // variant: 'pills',
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
        <CategoryConfiguration />
      </Tabs.Panel>

      <Tabs.Panel value='template'>
        <TemplateConfiguration repository={repository} />
      </Tabs.Panel>
    </Tabs>
  );
};
