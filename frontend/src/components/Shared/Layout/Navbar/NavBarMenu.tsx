import { Navbar } from '@mantine/core';
import { NavBarMenuItem } from './NavBarMenuItem';
import { useTranslation } from '../../hooks/useTranslation';
import {
  IconHome2,
  IconUser,
  IconMessageCircle,
  IconAddressBook,
  IconSettings,
} from '@tabler/icons-react';

export const NavBarMenu = () => {
  const t = useTranslation();

  return (
    <Navbar.Section
      sx={{
        display: 'flex',
        gap: '0.8rem',
        flexDirection: 'column',
        borderBottom: '1px',
      }}
      grow
    >
      <NavBarMenuItem to='/' text={t('home')} icon={<IconHome2 />} />
      <NavBarMenuItem
        to='/message'
        text={t('message', { plural: true })}
        icon={<IconMessageCircle />}
      />
      <NavBarMenuItem
        to='/contact'
        text={t('contact', { plural: true })}
        icon={<IconAddressBook />}
      />
      <NavBarMenuItem
        to='/configuration'
        text={t('configuration', { plural: true })}
        icon={<IconSettings />}
      />
      <NavBarMenuItem to='/profile' text={t('profile')} icon={<IconUser />} />
    </Navbar.Section>
  );
};
