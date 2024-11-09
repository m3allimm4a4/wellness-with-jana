import { IEnvironment } from './ienvironment.interface';

export const environment: IEnvironment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  translationEndpoint: 'http://localhost:3000/i18n/',
  assetsUrl: 'https://wellness-with-jana-object-storage.fra1.digitaloceanspaces.com',
  languages: ['en'],
};
