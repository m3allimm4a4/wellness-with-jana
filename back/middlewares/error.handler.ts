import { ErrorRequestHandler } from 'express';
import { NotFoundError } from '../errors/not-found.error';
import { UnauthorizedError } from '../errors/unauthorized.error';

export const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (err instanceof UnauthorizedError) {
    res.status(401).send('Unauthorized');
  } else if (err instanceof NotFoundError) {
    res.status(404).send('Not found');
  } else {
    console.error(err);
    res.status(500).send('Something went wrong. Try again later.');
  }
  next();
};
