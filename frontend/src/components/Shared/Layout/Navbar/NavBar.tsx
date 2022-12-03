import { Navbar as MantineNavbar } from '@mantine/core';
import { NavBarFooter } from './NavBarFooter';
import { NavBarHeader } from './NavBarHeader';
import { NavBarMenu } from './NavBarMenu';
import { animated, useSpring } from '@react-spring/web';
import { useSelector } from '../../../../config/store';

import styles from './styles.module.css';

export const Navbar = () => {
  const { navbarCollapsed } = useSelector((state) => state.layout);

  /*La animacion del sidebar se peta al hacer el collapse, por culpa de los navitems
  el navbarCollapsed hace que se oculten los textos de los botones
  y el flexbox automaticamente se reduce rompiendo la animacion
  Lo extraño es que si estas en las rutas con nombre mas corto 
  "Inicio" y "Perfil" no se rompe.  */

  const [springStyle] = useSpring(() => {
    return {
      from: {
        width: '200px',
      },
      to: {
        width: '76px',
      },
      reverse: navbarCollapsed,
    };
  }, [navbarCollapsed]);

  const navbarProps = {
    classNames: {
      root: `${styles.root}`,
    },
    style: springStyle,
  };

  const AnimatedMantineNavbar = animated(MantineNavbar);

  return (
    <AnimatedMantineNavbar {...navbarProps}>
      {/* <MantineNavbar {...navbarProps}> */}
      {/* <animated.div style={props}> */}
      <NavBarHeader />
      <NavBarMenu />
      <NavBarFooter />
      {/* </animated.div> */}
    </AnimatedMantineNavbar>
  );
};
