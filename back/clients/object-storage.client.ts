import { DeleteObjectCommand, ObjectCannedACL, PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from './s3.client';

export const deleteObject = (fileName: string) => {
  const command = new DeleteObjectCommand({
    Bucket: process.env.DO_BUCKET_NAME,
    Key: fileName,
  });
  return s3Client().send(command);
};

export const putObject = (data: Buffer, fileName: string, acl: ObjectCannedACL) => {
  const command = new PutObjectCommand({
    Bucket: process.env.DO_BUCKET_NAME,
    Body: data,
    Key: fileName,
    ACL: acl,
  });
  return s3Client().send(command);
};
