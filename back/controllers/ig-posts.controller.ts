import { RequestHandler } from 'express';
import { catchAsync } from '../shared/catchAsync';
import { IgPost, IIgPost } from '../models/ig-post.model';
import { InvalidIdError } from '../errors/invalid-id.error';
import { NotFoundError } from '../errors/not-found.error';
import { BadRequestError } from '../errors/bad-request.error';
import { UploadedFile } from 'express-fileupload';
import { addOrUpdateAsset, removeAsset } from '../shared/asset-manager';
import { IAsset } from '../models/asset.model';

export const getIgPosts: RequestHandler = catchAsync(async (_req, res): Promise<void> => {
  const posts = await IgPost.find().populate('asset');
  res.status(200).json(posts.map(post => post.toObject()));
});

export const getIgPost: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const id = req.params.id;
  if (!id) {
    throw new InvalidIdError();
  }
  const post = await IgPost.findById(id).populate('asset');
  if (!post) {
    throw new NotFoundError();
  }
  res.status(200).json(post.toObject());
});

export const createIgPost: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const post: Partial<IIgPost> = req.body;

  if (!post?.url) {
    throw new BadRequestError();
  }

  const newIgPost = await IgPost.create({ url: post.url });

  res.status(200).json(newIgPost.toObject());
});

export const updateIgPost: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const id = req.params.id;
  const post: Partial<IIgPost> = req.body;

  if (!id || !post?.url) {
    throw new BadRequestError();
  }

  const newPost = await IgPost.findByIdAndUpdate(id, { url: post.url });

  if (!newPost) {
    throw new NotFoundError();
  }

  res.status(200).json(newPost.toObject());
});

export const updateIgPostAsset: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const id = req.params['id'];

  if (!id || !req.files?.file || req.files?.file instanceof Array) {
    throw new BadRequestError();
  }
  const file = req.files?.file as UploadedFile;
  const igPost = await IgPost.findById(id).populate('asset');
  if (!igPost) {
    throw new NotFoundError();
  }
  const newAsset = await addOrUpdateAsset('ig-posts-' + igPost._id.toString(), 'ig-posts', file);
  igPost.asset = newAsset.id;
  await igPost.save();
  const result = await igPost.populate('asset');
  res.status(200).json(result.toObject());
});

export const deleteIgPost: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const id = req.params.id;
  if (!id) {
    throw new InvalidIdError();
  }

  const result = await IgPost.findById(id).populate('asset');

  if (!result) {
    throw new NotFoundError();
  }
  if ((result.asset as IAsset)?.name) {
    await removeAsset((result.asset as IAsset)?.name);
  }
  await result.deleteOne();

  res.status(204).send();
});
