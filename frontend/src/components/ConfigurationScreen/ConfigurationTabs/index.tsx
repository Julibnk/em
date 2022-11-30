import styles from './styles.module.css';

import { Tabs, TabsProps } from '@mantine/core';

import { ScreenContent } from '../../../components/shared/Layout/ScreenContent';
import { CategoryTableHeader } from '../CategoryTableHeader';
import { CategoryTable } from '../CategoryTable';
import { TemplateTableHeader } from '../TemplateTableHeader';
import { TemplateTable } from '../TemplateTable';
import { useTranslation } from '../../../hooks/useTranslation';

export const ConfigurationTabs = () => {
  const t = useTranslation();
  const tabsProps: TabsProps = {
    variant: 'pills',
    children: <></>,
    classNames: { panel: styles.body },
  };

  return (
    <Tabs {...tabsProps}>
      <Tabs.List>
        <Tabs.Tab value='template'>{t('template', { plural: true })}</Tabs.Tab>
        <Tabs.Tab value='category'>{t('category', { plural: true })}</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value='template'>
        <ScreenContent>
          <TemplateTableHeader />
          <TemplateTable />
        </ScreenContent>{' '}
      </Tabs.Panel>

      <Tabs.Panel value='category'>
        <ScreenContent>
          <CategoryTableHeader />
          <CategoryTable />
        </ScreenContent>
      </Tabs.Panel>
    </Tabs>
  );
};
