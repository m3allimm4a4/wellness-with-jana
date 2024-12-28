import { IService, Service } from './service.model';
import { model, Schema, Types } from 'mongoose';

export interface IAppointment extends Document {
  id: string;
  name: string;
  country: string;
  email: string;
  phone: string;
  time: Date;
  createdAt: Date;
  updatedAt: Date;
  service?: IService;
}

export const AppointmentSchema = new Schema<IAppointment>(
  {
    name: { type: String, required: true },
    country: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    time: { type: Date, required: true },
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
