import styles from './styles.module.css';

import { Button, ButtonProps, ButtonVariant } from '@mantine/core';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { useSelector } from '../../../../config/store';

type Props = {
  to: string;
  text?: string;
  icon?: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

const getClassNames = (variant: ButtonVariant, collapsed: boolean) => {
  if (variant === 'subtle') {
    return {
      root: `${styles.menu_item_root} ${styles.menu_item_subtle_root}`,
      inner: styles.menu_item_inner,
      icon: `${styles.menu_item_icon} ${styles.menu_item_subtle_icon} ${
        !collapsed && styles.menu_item_icon_collapsed
      }`,
    };
  }
  return {
    root: `${styles.menu_item_root} ${styles.menu_item_filled_root}`,
    inner: styles.menu_item_inner,
    icon: `${styles.menu_item_icon} ${
      !collapsed && styles.menu_item_icon_collapsed
    }`,
  };
};

export const NavBarMenuItem = ({ text, icon, className, to }: Props) => {
  const { navbarCollapsed } = useSelector((state) => state.layout);

  const resolved = useResolvedPath(to);
  const match = useMatch({ path: `${resolved.pathname}/*`, end: true });

  const variant = match ? 'filled' : 'subtle';

  // Mantine Props
  const buttonProps: ButtonProps = {
    fullWidth: navbarCollapsed,
    variant,
    leftIcon: icon,
    classNames: getClassNames(variant, navbarCollapsed),
    size: 'md',
  };

  return (
    <Button to={to} component={Link} className={className} {...buttonProps}>
      {navbarCollapsed && text}
    </Button>
  );
};
