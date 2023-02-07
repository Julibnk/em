import styles from './styles.module.css';
import { ActionIcon, ActionIconProps, Navbar } from '@mantine/core';
import { IconMenu2 } from '@tabler/icons-react';

export const NavBarFooter = () => {
  // const { navbarCollapsed } = useSelector((state) => state.layout);
  const navbarCollapsed = true;

  const handleClick = () => {
    // dispatch(setNavbarCollapsed(!navbarCollapsed));
  };

  const actionIconProps: ActionIconProps = {
    variant: 'filled',
    size: 'xl',
    color: 'turquoise',
    // onClick: handleClick,
    // type: 'button',
  };

  return (
    <Navbar.Section className={styles.footer_root}>
      <ActionIcon onClick={handleClick} {...actionIconProps}>
        <IconMenu2 />
      </ActionIcon>
    </Navbar.Section>
  );
};
