import { model, Schema, Document } from 'mongoose';

export interface IDynamicConfig extends Document {
  id: string;
  name: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
}

const DynamicConfigSchema = new Schema<IDynamicConfig>(
  {
    name: { type: String, required: true },
    value: { type: String, required: true, unique: true },
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

export const DynamicConfig = model<IDynamicConfig>('DynamicConfig', DynamicConfigSchema);
