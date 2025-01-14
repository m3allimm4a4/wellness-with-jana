import ms from 'ms';
import { sign, verify } from 'jsonwebtoken';
import { IUser } from '../models/user.model';
import { RefreshToken } from '../models/refresh-token.model';
import { Details } from 'express-useragent';

const signToken = (payload: object, secret: string, expiry: string) => {
  return new Promise<string>((resolve, reject) => {
    sign(payload, secret, { expiresIn: expiry }, (err, token) => {
      if (err) return reject(err);
      return resolve(token || '');
    });
  });
};

const verifyToken = <T>(token: string, secret: string): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    verify(token, secret, (err, decoded) => {
      if (err) return reject(err);
      return resolve(decoded as T);
    });
  });
};

export const generateAccessToken = async (user: IUser) => {
  const jwtSecret = process.env.JWT_SECRET || '';
  const jwtExpiry = process.env.JWT_EXPIRY || '';
  return await signToken(user, jwtSecret, jwtExpiry);
};

export const generateRefreshToken = async (userId: string, deviceInfo?: Details) => {
  const jwtSecret = process.env.JWT_REFRESH_SECRET || '';
  const jwtExpiry = process.env.JWT_REFRESH_EXPIRY || '';
  const token = await signToken({ userId }, jwtSecret, jwtExpiry);
  const refreshToken = await RefreshToken.create({
    user: userId,
    token: token,
    deviceInfo: deviceInfo ? `${deviceInfo.browser} on ${deviceInfo.os}` : '',
    expiresAt: new Date(Date.now() + ms(jwtExpiry)),
  });
  return refreshToken.toObject();
};

export const verifyRefreshToken = async (token: string) => {
  const jwtSecret = process.env.JWT_REFRESH_SECRET || '';

  const decoded = await verifyToken<{ userId: string }>(token, jwtSecret);
  const refreshToken = await RefreshToken.findOne({
    user: decoded.userId,
    token: token,
    expiresAt: { $gt: new Date() },
  });
  return refreshToken ? decoded.userId : undefined;
};

export const verifyAccessToken = async (token: string) => {
  const jwtSecret = process.env.JWT_SECRET || '';
  return await verifyToken<IUser>(token, jwtSecret);
};
