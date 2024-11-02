import { RequestHandler } from 'express';
import { catchAsync } from '../shared/catchAsync';
import { IService, Service } from '../models/service.model';
import { InvalidIdError } from '../errors/invalid-id.error';
import { NotFoundError } from '../errors/not-found.error';
import { BadRequestError } from '../errors/bad-request.error';

export const getServices: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  let query = Service.find();

  const tagsFilter = req.query.tags;
  if (typeof tagsFilter === 'string' && tagsFilter?.length) {
    const tags = tagsFilter.split(',');
    query = query.find({ tags: { $in: tags } });
  }

  const services = await query;
  res.status(200).json(services.map(service => service.toObject()));
});

export const getService: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const id = req.params.id;
  if (!id) {
    throw new InvalidIdError();
  }
  const service = await Service.findById(id);
  if (!service) {
    throw new NotFoundError();
  }
  res.status(200).json(service.toObject());
});

export const createService: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const service: Partial<IService> = req.body;

  if (!service?.name || !service?.title || !service?.description || !service?.price) {
    throw new BadRequestError();
  }

  const newService = await Service.create({
    name: service.name,
    price: service.price,
    title: service.title,
    description: service.description,
    tags: service.tags || [],
  });

  res.status(200).json(newService.toObject());
});

export const updateService: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const id = req.params.id;
  const service: Partial<IService> = req.body;

  if (!id || !service?.name || !service?.title || !service?.description || !service?.price) {
    throw new BadRequestError();
  }

  const newService = await Service.findByIdAndUpdate(id, {
    name: service.name,
    price: service.price,
    title: service.title,
    description: service.description,
    tags: service.tags || [],
  });

  if (!newService) {
    throw new NotFoundError();
  }

  res.status(200).json(newService.toObject());
});

export const deleteService: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const id = req.params.id;
  if (!id) {
    throw new InvalidIdError();
  }

  const result = await Service.findByIdAndDelete(id);

  if (!result) {
    throw new NotFoundError();
  }

  res.status(204).send();
});
