export enum UserRole {
  USER = 'USER',
}

export interface User {
  username: string;
  role: UserRole;
}
