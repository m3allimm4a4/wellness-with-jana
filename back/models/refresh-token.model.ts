import { model, Schema, Types } from 'mongoose';
import { IUser, User } from './user.model';

export interface IRefreshToken {
  id: string;
  user: IUser | string;
  token: string;
  deviceInfo: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const RefreshTokenSchema = new Schema<IRefreshToken>(
  {
    user: { type: Types.ObjectId, ref: User, required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    deviceInfo: { type: String, default: '' },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret) => {
        delete ret._id;
        return ret;
      },
    },
  },
);

export const RefreshToken = model<IRefreshToken>('RefreshToken', RefreshTokenSchema);
