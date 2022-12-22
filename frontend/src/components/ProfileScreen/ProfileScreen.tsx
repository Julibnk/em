import { FetchRestClient } from '../../core/RestClient/FetchRestClient';
import { RestAccountRespository } from '../../core/Account/RestAccountRepository';
import { ProfileTabs } from './ProfileTabs';
import { ProfileScreenProvider } from './ProfileScreenContext';

const client = new FetchRestClient();

const accountRepository = new RestAccountRespository(client);

const ProfileScreen = () => {
  return (
    <ProfileScreenProvider accountRepository={accountRepository}>
      <ProfileTabs />
    </ProfileScreenProvider>
  );
};

export default ProfileScreen;
