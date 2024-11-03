import { RequestHandler } from 'express';
import { catchAsync } from '../shared/catchAsync';
import { InvalidIdError } from '../errors/invalid-id.error';
import { NotFoundError } from '../errors/not-found.error';
import { BadRequestError } from '../errors/bad-request.error';
import { ITestemonial, Testemonial } from '../models/testemonial.model';

export const getTestemonials: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  let query = Testemonial.find();

  const tagsFilter = req.query.tags;
  if (typeof tagsFilter === 'string' && tagsFilter?.length) {
    const tags = tagsFilter.split(',');
    query = query.find({ tags: { $in: tags } });
  }
  const size = req.query.size;
  if (typeof size === 'string' && +size > 0) {
    query = query.limit(+size);
  }

  const testemonials = await query;
  res.status(200).json(testemonials.map(testemonial => testemonial.toObject()));
});

export const getTestemonial: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const id = req.params.id;
  if (!id) {
    throw new InvalidIdError();
  }
  const testemonial = await Testemonial.findById(id);
  if (!testemonial) {
    throw new NotFoundError();
  }
  res.status(200).json(testemonial.toObject());
});

export const createTestemonial: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const testemonial: Partial<ITestemonial> = req.body;

  if (!testemonial?.description || !testemonial?.clientName || !testemonial?.city || !testemonial?.country) {
    throw new BadRequestError();
  }

  const newTestemonial = await Testemonial.create({
    clientName: testemonial.clientName,
    description: testemonial.description,
    city: testemonial.city,
    country: testemonial.country,
    tags: testemonial.tags || [],
  });

  res.status(200).json(newTestemonial.toObject());
});

export const updateTestemonial: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const id = req.params.id;
  const testemonial: Partial<ITestemonial> = req.body;

  if (!id || !testemonial?.description || !testemonial?.clientName || !testemonial?.city || !testemonial?.country) {
    throw new BadRequestError();
  }

  const newTestemonial = await Testemonial.findByIdAndUpdate(id, {
    clientName: testemonial.clientName,
    description: testemonial.description,
    city: testemonial.city,
    country: testemonial.country,
    tags: testemonial.tags || [],
  });

  if (!newTestemonial) {
    throw new NotFoundError();
  }

  res.status(200).json(newTestemonial.toObject());
});

export const deleteTestemonial: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const id = req.params.id;
  if (!id) {
    throw new InvalidIdError();
  }

  const result = await Testemonial.findByIdAndDelete(id);

  if (!result) {
    throw new NotFoundError();
  }

  res.status(204).send();
});
