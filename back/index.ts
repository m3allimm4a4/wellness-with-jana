import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
import { NotFoundError } from './errors/not-found.error';
import { errorHandler } from './middlewares/error.handler';
import { labelRoutes } from './routes/labelRoutes';
import { createTranslationFiles } from './shared/translation-file-manager';
import { Language } from './types/language.type';
import { serviceRoutes } from './routes/serviceRoutes';
import { testemonialRoutes } from './routes/testemonialRoutes';
import { assetRoutes } from './routes/assetRoutes';
import { igPostRoutes } from './routes/igPostRoutes';

const run = async () => {
  const env = process.env.NODE_ENV || 'dev';
  dotenv.config({ path: `./environment/.${env}.env` });

  const server = express();

  await mongoose.connect(process.env.DATABASE_URL || '');

  const prod = process.env.PROD === 'true';
  if (prod) {
    const languages = (process.env.LANGUAGES || '').split(',') as Language[];
    await createTranslationFiles(languages);
  }

  server.use(cors());

  server.use(express.json());

  server.use(express.static('public'));

  server.use(
    fileUpload({
      createParentPath: true,
      limits: { fileSize: 100 * 1024 * 1024 },
      limitHandler: true,
      abortOnLimit: true,
      responseOnLimit: 'Files cannot be larger than 100 mb',
    }),
  );

  server.use('/api/labels', labelRoutes);
  server.use('/api/services', serviceRoutes);
  server.use('/api/testemonials', testemonialRoutes);
  server.use('/api/assets', assetRoutes);
  server.use('/api/ig-posts', igPostRoutes);

  server.get('/api/test', (_req, res) => {
    res.status(200).send('API is running');
  });

  server.get('/api/**', (_req, _res) => {
    throw new NotFoundError();
  });

  server.use(errorHandler);

  const port = Number(process.env.PORT) || 3000;
  server.listen(port, () => {
    if (!prod) {
      console.log(`Node Express server listening on http://localhost:${port}/api`);
    }
  });
};

run().catch(console.error);
