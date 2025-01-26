import { Asset, IAsset } from './asset.model';
import { model, Schema, Types } from 'mongoose';

export interface IBlog {
  id: string;
  title: string;
  tag: string;
  author: string;
  content: string;
  contentImages: string[];
  related?: IBlog[] | string[];
  bannerAsset?: IAsset | string;
  createdAt: Date;
  updatedAt: Date;
}

export const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    tag: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String, default: '' },
    contentImages: { type: [String], default: [] },
    related: [{ type: Types.ObjectId, ref: 'Blog' }],
    bannerAsset: { type: Types.ObjectId, ref: Asset },
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

export const Blog = model<IBlog>('Blog', BlogSchema);
