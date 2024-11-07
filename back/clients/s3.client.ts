import { S3 } from '@aws-sdk/client-s3';

export const s3Client = () =>
  new S3({
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    endpoint: process.env.DO_BUCKET_ENDPOINT,
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.DO_BUCKET_CLIENT_ID || '',
      secretAccessKey: process.env.DO_BUCKET_CLIENT_SECRET || '',
    },
  });
