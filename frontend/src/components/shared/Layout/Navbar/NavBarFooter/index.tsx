import styles from './styles.module.css';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActionIcon, ActionIconProps, Navbar } from '@mantine/core';
import { setNavbarCollapsed } from '../../../../../store/layout-slice';
import { useDispatch, useSelector } from '../../../../../store/store';

export const NavBarFooter = () => {
  const dispatch = useDispatch();

  const { navbarCollapsed } = useSelector((state) => state.layout);

  const handleClick = () => {
    dispatch(setNavbarCollapsed(!navbarCollapsed));
  };

  const actionIconProps: ActionIconProps = {
    variant: 'filled',
    size: 'xl',
    color: 'turquoise',
    // onClick: handleClick,
    // type: 'button',
  };

  return (
    <Navbar.Section className={styles.root}>
      <ActionIcon onClick={handleClick} {...actionIconProps}>
        <FontAwesomeIcon icon={faBars} />
      </ActionIcon>
    </Navbar.Section>
  );
};
