import { UploadedFile } from 'express-fileupload';
import { catchAsync } from '../shared/catchAsync';
import { RequestHandler } from 'express';
import { InvalidIdError } from '../errors/invalid-id.error';
import { NotFoundError } from '../errors/not-found.error';
import { BadRequestError } from '../errors/bad-request.error';
import { Asset } from '../models/asset.model';
import { addOrUpdateAsset, removeAsset } from '../shared/asset-manager';
import { generateFavicon } from '../shared/file-converter';
import { putObject } from '../clients/object-storage.client';

export const getAssets: RequestHandler = catchAsync(async (_req, res): Promise<void> => {
  const assets = await Asset.find();
  res.status(200).json(assets.map(asset => asset.toObject()));
});

export const getAsset: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const id = req.params['id'];
  if (!id) {
    throw new InvalidIdError();
  }
  const asset = await Asset.findOne({ name: id });
  if (!asset) {
    throw new NotFoundError();
  }
  res.status(200).json(asset.toObject());
});

export const createOrUpdateAsset: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const id = req.params['id'];
  const path = req.params['path'];

  if (!id || !path || !req.files?.file || req.files?.file instanceof Array) {
    throw new BadRequestError();
  }
  const file = req.files?.file as UploadedFile;

  const newAsset = addOrUpdateAsset(id, path, file);

  res.status(200).json(newAsset);
});

export const deleteAsset: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const id = req.params['id'];
  if (!id) {
    throw new InvalidIdError();
  }
  await removeAsset(id);

  res.status(204).send();
});

export const uploadFavicon: RequestHandler = catchAsync(async (req, res) => {
  if (!req.files?.file || req.files?.file instanceof Array) {
    throw new BadRequestError();
  }
  const icon = req.files?.file as UploadedFile;
  const result = await generateFavicon(icon.data);

  await putObject(JSON.stringify(result.manifest), 'favicon/site.webmanifest', 'public-read');
  for (const file of result.icons) {
    await putObject(file.buffer, `favicon/${file.fileName}`, 'public-read');
  }

  res.status(200).send();
});
