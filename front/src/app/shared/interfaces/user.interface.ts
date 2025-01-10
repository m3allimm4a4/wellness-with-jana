import { Entity } from './entity.interface';

export interface User extends Entity {
  name: string;
  lastname: string;
  country: string;
  phone: string;
  email: string;
  password: string;
  emailVerified: boolean;
  roles: UserRole[];
  verificationHash?: string;
}

export enum UserRole {
  NORMAL = 'NORMAL',
  ADMIN = 'ADMIN',
}
