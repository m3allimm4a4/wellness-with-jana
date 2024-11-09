import { RequestHandler } from 'express';
import { catchAsync } from '../shared/catchAsync';
import { ContactInfo, IContactInfo } from '../models/contact-info.model';
import { NotFoundError } from '../errors/not-found.error';

export const getContactInfo: RequestHandler = catchAsync(async (_req, res): Promise<void> => {
  const contactInfo = await ContactInfo.findOne();
  if (!contactInfo) {
    throw new NotFoundError();
  }
  res.status(200).json(contactInfo.toObject());
});

export const saveContactInfo: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const body: Partial<IContactInfo> = req.body;
  const contactInfo = await ContactInfo.findOne();
  let newContactInfo = !contactInfo
    ? await ContactInfo.create(body)
    : await ContactInfo.findByIdAndUpdate(contactInfo._id, body);
  if (!newContactInfo) {
    throw new NotFoundError();
  }
  res.status(200).json(newContactInfo.toObject());
});
