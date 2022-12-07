import styles from './styles.module.css';

import { Tabs, TabsProps } from '@mantine/core';

import { ScreenContent } from '../Shared/Layout/ScreenContent';
import { CategoryTableHeader } from './CategoryTable/CategoryTableHeader';
import { CategoryTable } from './CategoryTable/CategoryTable';
import { TemplateTableHeader } from './TemplateTable/TemplateTableHeader';
import { TemplateTable } from './TemplateTable/TemplateTable';
import { useTranslation } from '../../Shared/hooks/useTranslation';
import { CategoryModal } from './CategoryTable/CategoryModal';
import { TemplateModal } from './TemplateTable/TemplateModal';

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
        <ScreenContent>
          <CategoryTableHeader />
          <CategoryTable />
          <CategoryModal />
        </ScreenContent>
      </Tabs.Panel>

      <Tabs.Panel value='template'>
        <ScreenContent>
          <TemplateTableHeader />
          <TemplateTable />
          <TemplateModal />
        </ScreenContent>
      </Tabs.Panel>
    </Tabs>
  );
};
