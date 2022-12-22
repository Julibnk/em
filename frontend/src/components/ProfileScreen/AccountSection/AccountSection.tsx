import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mantine/core';
import { HorizontalBar } from '../../Shared/HorizontalBar/HorizontalBar';
import { AccountSectionHeader } from './AccountSectionHeader';

export const AccountSection = () => {
  return (
    <>
      <AccountSectionHeader />
      <HorizontalBar />
      <div style={{ display: 'flex' }}>
        <div style={{ flexBasis: '33.33%' }}>
          <Button variant='filled' leftIcon={<FontAwesomeIcon icon={faSave} />}>
            asdas
          </Button>
        </div>
        <div style={{ flexBasis: '66.66%' }}>
          <Button variant='filled' leftIcon={<FontAwesomeIcon icon={faSave} />}>
            asdas
          </Button>
        </div>
      </div>
      <HorizontalBar />
    </>
  );
};
