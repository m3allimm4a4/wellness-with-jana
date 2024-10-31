import { model, Schema } from 'mongoose';

export const LabelSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    en: { type: String, default: '' },
  },
  { timestamps: true },
);

export const Label = model('Label', LabelSchema);
