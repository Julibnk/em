import styles from './styles.module.css';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActionIcon, ActionIconProps, Navbar } from '@mantine/core';

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
        <FontAwesomeIcon icon={faBars} />
      </ActionIcon>
    </Navbar.Section>
  );
};
