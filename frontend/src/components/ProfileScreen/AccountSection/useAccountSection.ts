import useSWR from 'swr';
import { useProfileScreenContext } from '../ProfileScreenContext';

export function useAccountSection() {
  const { accountRepository } = useProfileScreenContext();

  const { data: account, isLoading } = useSWR(
    'account/2fd11e2e-7971-4454-90eb-bc5c42b3d064',
    () => accountRepository.searchById('2fd11e2e-7971-4454-90eb-bc5c42b3d064')
  );

  return {
    account,
    isLoading,
  };
  // useSWRConfig;
}
