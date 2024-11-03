import { model, Schema } from 'mongoose';

export interface ITestemonial extends Document {
  id: string;
  description: string;
  clientName: string;
  city: string;
  country: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const TestemonialSchema = new Schema<ITestemonial>(
  {
    description: { type: String, required: true },
    clientName: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    tags: { type: [String], default: [] },
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

export const Testemonial = model<ITestemonial>('Testemonial', TestemonialSchema);
