import { RequestHandler } from 'express';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { UserRole } from '../models/user.model';
import { verifyAccessToken } from '../shared/jwt-manager';

export const auth: (roles: UserRole[]) => RequestHandler = roles => {
  return (req, _res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.replace('Bearer ', '');
    if (!token) throw new UnauthorizedError();

    verifyAccessToken(token)
      .then(user => {
        if (user.roles.some(role => role === UserRole.ADMIN) || roles.some(role => user.roles.includes(role))) {
          req.user = user;
          next();
          return;
        }
        throw new UnauthorizedError();
      })
      .catch(() => {
        throw new UnauthorizedError();
      });
  };
};
