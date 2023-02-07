import { Tabs } from '@mantine/core';
import { useTranslation } from '../Shared/hooks/useTranslation';
import { AccountSection } from './AccountSection/AccountSection';
import { MetaAccountSection } from './MetaAccountSection/MetaAccountSection';
import { BillingSection } from './BillingSection/BillingSection';
import { UsersSection } from './UsersSection/UsersSection';

enum ProfileSections {
  ACCOUNT = 'ACCOUNT',
  META_ACCOUNT = 'META_ACCOUNT',
  BILING = 'BILLING',
  USERS = 'USERS',
}

export const ProfileTabs = () => {
  const t = useTranslation();

  return (
    <Tabs defaultValue={ProfileSections.ACCOUNT}>
      <Tabs.List>
        <Tabs.Tab value={ProfileSections.ACCOUNT}>{t('account')}</Tabs.Tab>
        <Tabs.Tab value={ProfileSections.META_ACCOUNT}>
          {t('metaAccount')}
        </Tabs.Tab>
        <Tabs.Tab value={ProfileSections.BILING}>{t('billing')}</Tabs.Tab>
        <Tabs.Tab value={ProfileSections.USERS}>
          {t('user', { plural: true })}
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value={ProfileSections.ACCOUNT}>
        <AccountSection />
      </Tabs.Panel>

      <Tabs.Panel value={ProfileSections.META_ACCOUNT}>
        <MetaAccountSection />
      </Tabs.Panel>

      <Tabs.Panel value={ProfileSections.BILING}>
        <BillingSection />
      </Tabs.Panel>

      <Tabs.Panel value={ProfileSections.USERS}>
        <UsersSection />
      </Tabs.Panel>
    </Tabs>
  );
};
