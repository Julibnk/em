import { createContext, useContext } from 'react';
import { Nullable } from '../../core/Shared/Nullable';
import { AccountRepository } from '../../core/Account/AccountRepository';

interface ProfileScreenContext {
  accountRepository: Nullable<AccountRepository>;
}

export interface Props {
  accountRepository: AccountRepository;
  children: React.ReactNode;
}

const ProfileScreenContext = createContext<ProfileScreenContext>({
  accountRepository: null,
});

export const ProfileScreenProvider = ({
  accountRepository,
  children,
}: Props) => {
  return (
    <ProfileScreenContext.Provider value={{ accountRepository }}>
      {children}
    </ProfileScreenContext.Provider>
  );
};

export const useProfileScreenContext = () => {
  const { accountRepository } = useContext(ProfileScreenContext);

  if (!accountRepository) {
    throw new Error('Accunt repository is not defined');
  }

  return { accountRepository };
};
