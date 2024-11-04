import { UploadedFile } from 'express-fileupload';
import { extname } from 'path';
import { catchAsync } from '../shared/catchAsync';
import { RequestHandler } from 'express';
import { InvalidIdError } from '../errors/invalid-id.error';
import { NotFoundError } from '../errors/not-found.error';
import { BadRequestError } from '../errors/bad-request.error';
import { Asset, IAsset } from '../models/asset.model';
import { deleteObject, putObject } from '../clients/object-storage.client';

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
  const asset = req.body as IAsset;

  if (!id || !asset.path || !asset.type || !req.files?.file || req.files?.file instanceof Array) {
    throw new BadRequestError();
  }
  const file = req.files?.file as UploadedFile;
  const uploadPath = `${asset.path}/${id}${extname(file.name)}`;

  let newAsset = await Asset.findOne({ name: id });
  if (!newAsset) {
    newAsset = await Asset.create({
      name: id,
      type: req.body.type,
      path: asset.path,
    });
    try {
      await putObject(file.data, uploadPath, 'public-read');
      newAsset.path = uploadPath;
      newAsset.save();
    } catch (e) {
      await Asset.findByIdAndDelete(newAsset.id);
      throw e;
    }
  } else {
    await deleteObject(newAsset.path);
    await putObject(file.data, uploadPath, 'public-read');
    newAsset.type = req.body.type;
    newAsset.path = uploadPath;
    newAsset.save();
  }

  res.status(200).json(newAsset.toObject());
});

export const deleteAsset: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const id = req.params['id'];
  if (!id) {
    throw new InvalidIdError();
  }
  const asset = await Asset.findOne({ name: id });
  if (!asset) {
    throw new NotFoundError();
  }
  await deleteObject(asset.path);
  await Asset.findByIdAndDelete(asset.id);
  res.status(204).send();
});
