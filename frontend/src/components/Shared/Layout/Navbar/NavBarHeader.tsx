import { faFontAwesome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar } from '@mantine/core';
import { NavBarMenuItem } from './NavBarMenuItem';

const Logo = <FontAwesomeIcon icon={faFontAwesome} />;

export const NavBarHeader = () => {
  return (
    <Navbar.Section>
      <NavBarMenuItem to='/' icon={Logo} text='EASYMESSAGE'></NavBarMenuItem>
    </Navbar.Section>
  );
};
