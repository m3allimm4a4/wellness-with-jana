import { model, Schema } from 'mongoose';

export enum UserRole {
  NORMAL = 'NORMAL',
  ADMIN = 'ADMIN',
}

export interface IUser {
  id: string;
  name: string;
  lastname: string;
  country: string;
  phone: string;
  email: string;
  password: string;
  emailVerified: boolean;
  roles: UserRole[];
  createdAt: Date;
  updatedAt: Date;
  verificationHash?: string;
}

export const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    verificationHash: { type: String },
    roles: [{ type: String, enum: Object.values(UserRole) }],
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret) => {
        delete ret._id;
        ret.password = '';
        return ret;
      },
    },
  },
);

export const User = model<IUser>('User', UserSchema);
