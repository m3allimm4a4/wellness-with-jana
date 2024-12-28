import { model, Schema } from 'mongoose';

export interface IContactInfo {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  phone?: string;
  email?: string;
  whatsapp?: string;
  ig?: string;
  facebook?: string;
  youtube?: string;
  address?: string;
}

export const ContactInfoSchema = new Schema<IContactInfo>(
  {
    phone: { type: String },
    email: { type: String },
    whatsapp: { type: String },
    ig: { type: String },
    facebook: { type: String },
    youtube: { type: String },
    address: { type: String },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        delete ret._id;
        return ret;
      },
    },
  },
);

export const ContactInfo = model<IContactInfo>('ContactInfo', ContactInfoSchema);
