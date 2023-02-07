import { FetchRestClient } from '../Shared/RestClient/FetchRestClient';
import { RestClient } from '../Shared/RestClient/RestClient';
import { AuthRequest, AuthResponse } from './Auth';
import { AuthRepository } from './AuthRepository';

export class RestAuthRepository implements AuthRepository {
  constructor(private client: RestClient) {}

  async login({ email, password }: AuthRequest): Promise<AuthResponse> {
    const form = {
      email: email,
      password: password,
    };

    const res = await this.client.post('login', form);

    const loginResponse: AuthResponse = await res.json();

    return loginResponse;
  }

  static create() {
    return new RestAuthRepository(new FetchRestClient());
  }
}
