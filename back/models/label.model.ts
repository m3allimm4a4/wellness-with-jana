import { model, Schema } from 'mongoose';

interface ILabel extends Document {
  name: string;
  en: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export const LabelSchema = new Schema<ILabel>(
  {
    name: { type: String, required: true, unique: true },
    en: { type: String, default: '' },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      },
    },
  },
);

export const Label = model<ILabel>('Label', LabelSchema);
