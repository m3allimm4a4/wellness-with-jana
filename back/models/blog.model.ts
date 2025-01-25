import { IAsset } from './asset.model';
import { model, Schema, Types } from 'mongoose';

export interface IBlog {
  id: string;
  title: string;
  tag: string;
  author: string;
  content?: string;
  related?: IBlog[] | string[];
  bannerAsset?: IAsset;
  contentImages?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    tag: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String },
    related: { type: [Types.ObjectId] },
    bannerAsset: { type: Types.ObjectId },
    contentImages: { type: [String] },
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
