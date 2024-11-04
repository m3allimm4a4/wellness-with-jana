import { model, Schema } from 'mongoose';

export enum AssetType {
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
}

export interface IAsset extends Document {
  id: string;
  name: string;
  type: AssetType;
  path: string;
  createdAt: Date;
  updatedAt: Date;
}

export const AssetSchema = new Schema<IAsset>(
  {
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true, enum: Object.values(AssetType) },
    path: { type: String, required: true },
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

export const Asset = model<IAsset>('Asset', AssetSchema);
