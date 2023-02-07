export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  jwt: string;
}
