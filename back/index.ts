import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { NotFoundError } from './errors/not-found.error';
import { errorHandler } from './middlewares/error.handler';

const run = async () => {
  const server = express();

  server.use(cors());

  server.use(
    fileUpload({
      createParentPath: true,
      limits: { fileSize: 100 * 1024 * 1024 },
      limitHandler: true,
      abortOnLimit: true,
      responseOnLimit: 'Files cannot be larger than 100 mb',
    }),
  );

  server.get('/api/**', (_req, _res) => {
    throw new NotFoundError();
  });

  server.use(errorHandler);

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    if (!process.env.PROD) {
      console.log(`Node Express server listening on http://localhost:${port}/api`);
    }
  });
};

run().catch(console.error);
