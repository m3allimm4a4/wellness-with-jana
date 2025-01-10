import { hash, compare } from 'bcryptjs';
import { randomUUID } from 'crypto';

export const hashPassword = async (password: string) => {
  const saltRounds = process.env.BCRYPT_SALT_ROUNDS || '10';
  return await hash(password, +saltRounds);
};

export const isValidPassword = async (password: string, hash: string) => {
  return await compare(password, hash);
};

export const generateVerificationToken = async () => {
  const saltRounds = process.env.BCRYPT_SALT_ROUNDS || '10';
  const uuid = randomUUID();
  return await hash(uuid, saltRounds);
};
