import { RestAccountRespository } from '../../core/Account/RestAccountRepository';
import { ProfileTabs } from './ProfileTabs';
import { ProfileScreenProvider } from './ProfileScreenContext';

const accountRepository = RestAccountRespository.create();

const ProfileScreen = () => {
  return (
    <ProfileScreenProvider accountRepository={accountRepository}>
      <ProfileTabs />
    </ProfileScreenProvider>
  );
};

export default ProfileScreen;
