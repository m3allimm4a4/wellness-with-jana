import { randomUUID } from 'crypto';
import { Asset, AssetType } from '../models/asset.model';
import { convertToWebp } from './file-converter';
import { extname } from 'path';
import { deleteObject, putObject } from '../clients/object-storage.client';
import { UploadedFile } from 'express-fileupload';
import { NotFoundError } from '../errors/not-found.error';
import { InvalidAssetError } from '../errors/invalid-asset.error';

export const addOrUpdateAsset = async (id: string, path: string, file: UploadedFile) => {
  let data: Buffer;
  let uploadPath = `${path}/${id}-${randomUUID()}`;
  let type: AssetType;
  if (file.mimetype.startsWith('image/')) {
    type = AssetType.IMAGE;
    uploadPath += '.webp';
    data = file.mimetype === 'image/webp' ? file.data : await convertToWebp(file.data);
  } else if (file.mimetype.startsWith('video/')) {
    type = AssetType.VIDEO;
    uploadPath += extname(file.name);
    data = file.data;
  } else {
    throw new InvalidAssetError();
  }

  let newAsset = await Asset.findOne({ name: id });
  if (!newAsset) {
    newAsset = await Asset.create({
      name: id,
      type: type,
      path: path,
    });
    try {
      await putObject(data, uploadPath, 'public-read');
      newAsset.path = uploadPath;
      await newAsset.save();
    } catch (e) {
      await Asset.findByIdAndDelete(newAsset.id);
      throw e;
    }
  } else {
    await deleteObject(newAsset.path);
    await putObject(file.data, uploadPath, 'public-read');
    newAsset.type = type;
    newAsset.path = uploadPath;
    await newAsset.save();
  }
  return newAsset.toObject();
};

export const removeAsset = async (id: string) => {
  const asset = await Asset.findOne({ name: id });
  if (!asset) {
    throw new NotFoundError();
  }
  await deleteObject(asset.path);
  await Asset.findByIdAndDelete(asset.id);
};

export const uploadBlogImage = async (id: string, file: UploadedFile) => {
  if (!file.mimetype.startsWith('image/')) {
    throw new InvalidAssetError();
  }
  const uploadPath = `blogs/${id}/${randomUUID()}.webp`;
  const data = file.mimetype === 'image/webp' ? file.data : await convertToWebp(file.data);
  await putObject(data, uploadPath, 'public-read');
  return uploadPath;
};

export const deleteBlogImage = async (path: string) => {
  await deleteObject(path);
};

export const clearBlogImages = async (id: string) => {
  await deleteObject(`blogs/${id}`);
};
