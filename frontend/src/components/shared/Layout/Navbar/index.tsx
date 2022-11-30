import { Navbar as MantineNavbar } from '@mantine/core';
// import { useSelector } from '@store/store';

import { NavBarFooter } from './NavBarFooter';
import { NavBarHeader } from './NavBarHeader';
import { NavBarMenu } from './NavBarMenu';

import styles from './styles.module.css';

export const Navbar = () => {
  const navbarProps = {
    classNames: {
      root: `${styles.root}`,
    },
  };

  return (
    <MantineNavbar {...navbarProps}>
      <NavBarHeader />
      <NavBarMenu />
      <NavBarFooter />
    </MantineNavbar>
  );
};
