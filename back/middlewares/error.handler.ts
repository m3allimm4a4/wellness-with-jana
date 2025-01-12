import { ErrorRequestHandler } from 'express';
import { NotFoundError } from '../errors/not-found.error';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { BadRequestError } from '../errors/bad-request.error';
import { ForbiddenError } from '../errors/forbidden.error';

export const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (err instanceof UnauthorizedError) {
    res.status(401).send(err.message);
  } else if (err instanceof ForbiddenError) {
    res.status(403).send(err.message);
  } else if (err instanceof NotFoundError) {
    res.status(404).send(err.message);
  } else if (err instanceof BadRequestError) {
    res.status(400).send(err.message);
  } else {
    console.error(err);
    const message = process.env.NODE_ENV === 'production' ? 'Something went wrong. Try again later.' : err.message;
    res.status(500).send(message);
  }
  next();
};
