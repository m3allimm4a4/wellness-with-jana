import { Asset, IAsset } from './asset.model';
import { model, Schema, Types } from 'mongoose';

export interface IIgPost extends Document {
  id: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  asset?: IAsset | string;
}

export const IgPostSchema = new Schema<IIgPost>(
  {
    url: { type: String, required: true },
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

export const IgPost = model<IIgPost>('IgPost', IgPostSchema);
