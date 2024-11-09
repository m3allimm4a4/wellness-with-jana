import { RequestHandler } from 'express';
import { catchAsync } from '../shared/catchAsync';
import { ContactInfo, IContactInfo } from '../models/contact-info.model';
import { NotFoundError } from '../errors/not-found.error';
import { ContactMessage } from '../types/contact-message.type';
import { BadRequestError } from '../errors/bad-request.error';
import { sendEmail } from '../shared/mail-sender';

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

export const sendMessage: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const body: ContactMessage = req.body;
  if (!body || !body.name || !body.email || !body.message || !body.phone || !body.subject) {
    throw new BadRequestError();
  }

  const html = `
    <table>
      <tr>
        <th>Name</th>
        <td>${body.name}</td>
      </tr>
      <tr>
        <th>Email</th>
        <td>${body.email}</td>
      </tr>
      <tr>
        <th>Phone</th>
        <td>${body.phone}</td>
      </tr>
      <tr>
        <th>Subject</th>
        <td>${body.subject}</td>
      </tr>
      <tr>
        <th>Message</th>
        <td>${body.message}</td>
      </tr>
    </table>
`;

  await sendEmail('Contact Message', [process.env.SENDER_EMAIL || ''], html);
  res.status(200).send();
});
