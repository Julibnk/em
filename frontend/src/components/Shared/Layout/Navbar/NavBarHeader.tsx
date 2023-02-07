import { Navbar } from '@mantine/core';
import { IconCategory2 } from '@tabler/icons-react';
import { NavBarMenuItem } from './NavBarMenuItem';

export const NavBarHeader = () => {
  return (
    <Navbar.Section>
      <NavBarMenuItem
        to='/'
        icon={<IconCategory2 />}
        text='EM'
      ></NavBarMenuItem>
    </Navbar.Section>
  );
};
