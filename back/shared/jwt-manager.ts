import ms from 'ms';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { IUser } from '../models/user.model';
import { RefreshToken } from '../models/refresh-token.model';
import { Details } from 'express-useragent';

const signToken = (payload: string | IUser, secret: string, expiry: string) => {
  return new Promise<string>((resolve, reject) => {
    sign(payload, secret, { expiresIn: expiry }, (err, token) => {
      if (err) return reject(err);
      return resolve(token || '');
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
  const token = await signToken(userId, jwtSecret, jwtExpiry);
  const refreshToken = await RefreshToken.create({
    user: userId,
    refreshToken: token,
    deviceInfo: deviceInfo ? `${deviceInfo.platform} on ${deviceInfo.os}` : '',
    expiresAt: new Date(Date.now() + ms(jwtExpiry)),
  });
  return refreshToken.toObject();
};

export const verifyRefreshToken = async (token: string): Promise<string> => {
  const jwtSecret = process.env.JWT_REFRESH_SECRET || '';
  const decoded = verify(token, jwtSecret) as JwtPayload;
  const refreshToken = await RefreshToken.findOne({
    user: decoded.userId,
    token: token,
    expiresAt: { $gt: new Date() },
  });
  return refreshToken ? decoded.userId : undefined;
};
