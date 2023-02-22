import { Tabs, TabsProps } from '@mantine/core';
import { useTranslation } from '../Shared/hooks/useTranslation';
import { CategoryConfiguration } from './CategoryConfiguration/CategoryConfiguration';
import { TemplateConfiguration } from './TemplateConfiguration/TemplateConfiguration';

enum ConfigurationSections {
  CATEGORY = 'category',
  TEMPLATE = 'template',
}

export const ConfigurationTabs = () => {
  const t = useTranslation();
  const tabsProps: TabsProps = {
    children: <></>,
    defaultValue: ConfigurationSections.CATEGORY,
    variant: 'pills',
  };

  return (
    <Tabs {...tabsProps}>
      <Tabs.List position='center'>
        <Tabs.Tab value={ConfigurationSections.CATEGORY}>
          {t('category', { plural: true })}
        </Tabs.Tab>
        <Tabs.Tab value={ConfigurationSections.TEMPLATE}>
          {t('whatsappTemplate', { plural: true })}
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value={ConfigurationSections.CATEGORY}>
        <CategoryConfiguration />
      </Tabs.Panel>

      <Tabs.Panel value={ConfigurationSections.TEMPLATE}>
        <TemplateConfiguration />
      </Tabs.Panel>
    </Tabs>
  );
};
