import { RequestHandler } from 'express';
import { catchAsync } from '../shared/catchAsync';
import { BadRequestError } from '../errors/bad-request.error';
import { UploadedFile } from 'express-fileupload';
import { writeFile, mkdir } from 'fs/promises';

export const uploadAsset: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params['id'];

  if (!id || !req.files?.upload || req.files?.upload instanceof Array) {
    throw new BadRequestError();
  }

  const file = req.files?.upload as UploadedFile;

  const filePath = `./public/blogs/${id}/${file.name}`;

  await mkdir(`./public/blogs/${id}/`, { recursive: true });
  await writeFile(filePath, file.data);

  res.status(200).json({ url: `http://localhost:3000/blogs/${id}/${file.name}` });
});
