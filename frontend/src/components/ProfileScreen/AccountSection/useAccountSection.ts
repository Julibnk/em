import { useProfileScreenContext } from '../ProfileScreenContext';
import { useQuery } from '@tanstack/react-query';

export function useAccountSection() {
  const { accountRepository } = useProfileScreenContext();

  const { data: account, isLoading } = useQuery({
    queryKey: ['account/2fd11e2e-7971-4454-90eb-bc5c42b3d064'],
    queryFn: () =>
      accountRepository.searchById('2fd11e2e-7971-4454-90eb-bc5c42b3d064'),
  });

  return {
    account,
    isLoading,
  };
}
