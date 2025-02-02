import { RequestHandler } from 'express';
import { catchAsync } from '../shared/catchAsync';
import { BadRequestError } from '../errors/bad-request.error';
import { UploadedFile } from 'express-fileupload';
import { Blog, IBlog } from '../models/blog.model';
import { NotFoundError } from '../errors/not-found.error';
import { addOrUpdateAsset, clearBlogImages, removeAsset, uploadBlogImage } from '../shared/asset-manager';
import { IAsset } from '../models/asset.model';

export const getBlogs: RequestHandler = catchAsync(async (req, res) => {
  let query = Blog.find();
  const limit = req.query.limit;
  if (limit && typeof limit === 'string') {
    query = query.limit(+limit);
  }
  const offset = req.query.offset;
  if (offset && typeof offset === 'string') {
    query = query.skip(+offset);
  }
  const blogs = await query.populate('bannerAsset').populate('related');
  res.status(200).json(blogs.map(blog => blog.toObject()));
});

export const getBlog: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new BadRequestError();
  }
  const blog = await Blog.findById(id)
    .populate('bannerAsset')
    .populate({
      path: 'related',
      populate: { path: 'bannerAsset' },
    });
  if (!blog) {
    throw new NotFoundError();
  }
  res.status(200).json(blog.toObject());
});

export const addBlog: RequestHandler = catchAsync(async (req, res) => {
  const blog: Partial<IBlog> = req.body;
  if (!blog || !blog.title || !blog.tag || !blog.author) {
    throw new BadRequestError();
  }
  const newBlog = await Blog.create(blog);
  res.status(200).json(newBlog.toObject());
});

export const patchBlog: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const blog: Partial<IBlog> = req.body;
  if (!id || !blog) {
    throw new BadRequestError();
  }
  let newBlog = await Blog.findByIdAndUpdate(id, blog);
  if (!newBlog) {
    throw new NotFoundError();
  }
  // if (newBlog.contentImages.length) {
  //   const jsdom = new JSDOM(blog.content);
  //   const storageEndpoint = `${process.env.ASSETS_BASE_URL}`;
  //   const imagePaths = Array.from(jsdom.window.document.querySelectorAll('img'))
  //     .filter(img => img.src.includes(storageEndpoint))
  //     .map(img => img.src.replace(storageEndpoint, ''));
  //   const imagesToDelete = newBlog.contentImages.filter(path => !imagePaths.includes(path));
  //   if (imagesToDelete.length) {
  //     await Promise.all(imagesToDelete.map(path => deleteBlogImage(path)));
  //     await Blog.findByIdAndUpdate(id, {
  //       contentImages: newBlog.contentImages.filter(path => !imagesToDelete.includes(path)),
  //     });
  //   }
  // }
  res.status(200).json(newBlog.toObject());
});

export const uploadBanner: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const id = req.params['id'];

  if (!id || !req.files?.file || req.files?.file instanceof Array) {
    throw new BadRequestError();
  }
  const file = req.files?.file as UploadedFile;
  const blog = await Blog.findById(id).populate('related');
  if (!blog) {
    throw new NotFoundError();
  }
  const newAsset = await addOrUpdateAsset('blog-' + blog._id.toString(), 'blogs', file);
  blog.bannerAsset = newAsset.id;
  await blog.save();
  const newBlog = await blog.populate('bannerAsset');
  res.status(200).json(newBlog.toObject());
});

export const uploadAsset: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params['id'];

  if (!id || !req.files?.upload || req.files?.upload instanceof Array) {
    throw new BadRequestError();
  }

  const file = req.files?.upload as UploadedFile;

  const uploadedPath = await uploadBlogImage(id, file);
  await Blog.findByIdAndUpdate(id, { $push: { contentImages: uploadedPath } });

  res.status(200).json({ url: `${process.env.ASSETS_BASE_URL}/${uploadedPath}` });
});

export const deleteBlog: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params['id'];
  if (!id) {
    throw new BadRequestError();
  }

  const blog = await Blog.findById(id).populate('bannerAsset');
  if (!blog) {
    throw new NotFoundError();
  }

  if ((blog?.bannerAsset as IAsset)?.name) {
    await removeAsset((blog?.bannerAsset as IAsset)?.name);
  }
  await clearBlogImages(id);
  await blog.deleteOne();

  res.status(204).send();
});
