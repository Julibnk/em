import {
  faComment,
  faAddressBook,
  faUser,
} from '@fortawesome/free-regular-svg-icons';
import { Navbar } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavBarMenuItem } from './NavBarMenuItem';
import { faGear, faHouse } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from '../../../../core/Shared/hooks/useTranslation';

const HomeIcon = <FontAwesomeIcon icon={faHouse} />;
const CommentIcon = <FontAwesomeIcon icon={faComment} />;
const ContactIcon = <FontAwesomeIcon icon={faAddressBook} />;
const ConfigurationIcon = <FontAwesomeIcon icon={faGear} />;
const UserIcon = <FontAwesomeIcon icon={faUser} />;

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
      <NavBarMenuItem to='/' text={t('home')} icon={HomeIcon} />
      <NavBarMenuItem
        to='/message'
        text={t('message', { plural: true })}
        icon={CommentIcon}
      />
      <NavBarMenuItem
        to='/contact'
        text={t('contact', { plural: true })}
        icon={ContactIcon}
      />
      <NavBarMenuItem
        to='/configuration'
        className='mt-auto'
        text={t('configuration', { plural: true })}
        icon={ConfigurationIcon}
      />
      <NavBarMenuItem to='/profile' text={t('profile')} icon={UserIcon} />
    </Navbar.Section>
  );
};
