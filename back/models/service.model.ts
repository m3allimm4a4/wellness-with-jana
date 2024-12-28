import { model, Schema, Types } from 'mongoose';
import { Asset, IAsset } from './asset.model';

export interface IService {
  id: string;
  name: string;
  title: string;
  description: string;
  price: number;
  checkList: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  asset?: IAsset | string;
}

export const ServiceSchema = new Schema<IService>(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    checkList: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    asset: { type: Types.ObjectId, ref: Asset },
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
