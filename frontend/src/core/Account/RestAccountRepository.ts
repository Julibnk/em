import { RestClient } from '../Shared/RestClient/RestClient';
import { Nullable } from '../Shared/Nullable';
import { AccountRepository } from './AccountRepository';
import { Account } from './Account';

export class RestAccountRespository implements AccountRepository {
  constructor(private client: RestClient) {}

  async searchById(id: string): Promise<Nullable<Account>> {
    const response = await this.client.get(`account/${id}`);
    const category: Nullable<Account> = await response.json();
    return category;
  }

  async save(account: Account): Promise<void> {
    await this.client.put<Account>(`account/${account.id}`, account);
  }
}
