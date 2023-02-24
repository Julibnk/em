import { Tabs } from '@mantine/core';
import { useTranslation } from '../Shared/hooks/useTranslation';
import { AccountSection } from './AccountSection/AccountSection';
import { BillingSection } from './BillingSection/BillingSection';
import { UsersSection } from './UsersSection/UsersSection';
import { useAccountSection } from './AccountSection/useAccountSection';

enum ProfileSections {
  ACCOUNT = 'ACCOUNT',
  BILING = 'BILLING',
  USERS = 'USERS',
}

export const ProfileTabs = () => {
  const t = useTranslation();

  return (
    <Tabs defaultValue={ProfileSections.ACCOUNT}>
      <Tabs.List position='center'>
        <Tabs.Tab value={ProfileSections.ACCOUNT}>{t('account')}</Tabs.Tab>

        <Tabs.Tab value={ProfileSections.BILING}>{t('billing')}</Tabs.Tab>
        {/* <Tabs.Tab value={ProfileSections.USERS}>
          {t('user', { plural: true })}
        </Tabs.Tab> */}
      </Tabs.List>

      <Tabs.Panel value={ProfileSections.ACCOUNT}>
        <AccountSection />
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
