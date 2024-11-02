import { model, Schema } from 'mongoose';

export interface IService extends Document {
  id: string;
  name: string;
  title: string;
  description: string;
  imagePath: string;
  price: number;
  checkList: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const ServiceSchema = new Schema<IService>(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imagePath: { type: String, default: '' },
    checkList: { type: [String], default: [] },
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

export const Service = model<IService>('Service', ServiceSchema);
