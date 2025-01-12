import { User } from './user.interface';

export interface LoginResponse {
  accessToken: string;
  expiresAt: string;
  user: User;
}
