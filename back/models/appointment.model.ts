import { IService, Service } from './service.model';
import { model, Schema, Types } from 'mongoose';
import { IUser, User } from './user.model';

export interface IAppointment {
  id: string;
  user: IUser;
  start: Date;
  end: Date;
  confirmed: boolean;
  createdAt: Date;
  updatedAt: Date;
  service?: IService;
}

export const AppointmentSchema = new Schema<IAppointment>(
  {
    user: { type: User, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    confirmed: { type: Boolean, default: false },
    service: { type: Types.ObjectId, ref: Service },
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

export const Appointment = model<IAppointment>('Appointment', AppointmentSchema);
