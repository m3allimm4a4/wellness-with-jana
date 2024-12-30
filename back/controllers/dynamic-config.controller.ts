import { RequestHandler } from 'express';
import { catchAsync } from '../shared/catchAsync';
import { DynamicConfig } from '../models/dynamic-config.model';
import { BadRequestError } from '../errors/bad-request.error';
import { deleteDynamicConfig, getDynamicConfig, saveDynamicConfig } from '../shared/dynamic-config-manager';

export const getDynamicConfigs: RequestHandler = catchAsync(async (_req, res): Promise<void> => {
  const configs = await DynamicConfig.find();
  res.status(200).json(configs.map(config => config.toObject()));
});

export const getDynamicConfigById: RequestHandler = catchAsync(async (req, res) => {
  const name = req.params.name;
  if (!name) {
    throw new BadRequestError();
  }
  const config = await getDynamicConfig(name);
  res.status(200).json(config);
});

export const addOrUpdateConfig: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const name = req.params['name'];
  if (!name) {
    throw new BadRequestError();
  }
  const result = await saveDynamicConfig(name, req.body);
  res.status(201).json(result);
});

export const deleteConfig: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const name = req.params['name'];
  if (!name) {
    throw new BadRequestError();
  }
  await deleteDynamicConfig(name);
  res.status(204).send();
});
