import { AuthRequest, AuthResponse } from './Auth';
export interface AuthRepository {
  login(request: AuthRequest): Promise<AuthResponse>;
}
