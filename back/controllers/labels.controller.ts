import { catchAsync } from '../shared/catchAsync';
import { RequestHandler } from 'express';
import { Label } from '../models/label.model';
import { InvalidIdError } from '../errors/invalid-id.error';
import { NotFoundError } from '../errors/not-found.error';
import { removeLabelFromTranslationFile, updateTranslationFile } from '../shared/translation-file-manager';
import { BadRequestError } from '../errors/bad-request.error';

export const getLabels: RequestHandler = catchAsync(async (_req, res): Promise<void> => {
  const labels = await Label.find();
  res.status(200).json(labels.map(label => label.toObject()));
});

export const getLabel: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const id = req.params['id'];
  if (!id) {
    throw new InvalidIdError();
  }
  const label = await Label.findOne({ name: id });
  if (!label) {
    throw new NotFoundError();
  }
  res.status(200).json(label.toObject());
});

export const createOrUpdateLabel: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const id = req.params['id'];
  if (!id) {
    throw new InvalidIdError();
  }
  let label = await Label.findOne({ name: id });
  if (!label) {
    label = await Label.create({
      name: id,
      en: req.body.en,
    });
  } else {
    label.en = req.body.en;
    label.save();
  }
  await updateTranslationFile([{ name: label.name, label: label.en }], 'en');
  res.status(200).json(label.toObject());
});

export const createOrUpdateLabels: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const labels: { name: string; en: string }[] = req.body;
  if (!labels || !labels?.length) {
    throw new BadRequestError();
  }
  const bulkOps = labels.map(({ name, en }) => ({
    updateOne: {
      filter: { name },
      update: { $set: { en } },
      upsert: true,
    },
  }));

  const result = await Label.bulkWrite(bulkOps);
  const updatedLabels = labels.map(label => ({ name: label.name, label: label.en }));
  await updateTranslationFile(updatedLabels, 'en');
  res.status(200).json(result);
});

export const deleteLabel: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const id = req.params['id'];
  if (!id) {
    throw new InvalidIdError();
  }
  const result = await Label.deleteOne({ name: id });
  if (result.deletedCount) {
    await removeLabelFromTranslationFile(id, 'en');
  }
  res.status(200).json(result);
});
