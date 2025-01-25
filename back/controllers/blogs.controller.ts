import { RequestHandler } from 'express';
import { catchAsync } from '../shared/catchAsync';
import { BadRequestError } from '../errors/bad-request.error';
import { UploadedFile } from 'express-fileupload';
import { writeFile, mkdir } from 'fs/promises';
import { Blog, IBlog } from '../models/blog.model';
import { NotFoundError } from '../errors/not-found.error';

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
  const blogs = await query;
  res.status(200).json(blogs.map(blog => blog.toObject()));
});

export const getBlog: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new BadRequestError();
  }
  const blog = await Blog.findById(id);
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
  const newBlog = await Blog.findByIdAndUpdate(id, blog);
  if (!newBlog) {
    throw new NotFoundError();
  }
  res.status(200).json(newBlog.toObject());
});

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
