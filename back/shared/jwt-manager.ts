import { sign } from 'jsonwebtoken';
import { IUser } from '../models/user.model';

export const generateAuthToken = (user: IUser) => {
  const jwtSecret = process.env.JWT_SECRET || '';
  const jwtExpiry = process.env.JWT_EXPIRY || '';
  return sign(user, jwtSecret, { expiresIn: jwtExpiry });
};
