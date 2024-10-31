import { catchAsync } from '../shared/catchAsync';
import { RequestHandler } from 'express';
import { Label } from '../models/label.model';
import { InvalidIdError } from '../errors/invalid-id.error';
import { NotFoundError } from '../errors/not-found.error';
import { removeLabelFromTranslationFile, updateTranslationFile } from '../shared/translation-file-manager';

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
  await updateTranslationFile(label.name, label.en, 'en');
  res.status(200).json(label.toObject());
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
