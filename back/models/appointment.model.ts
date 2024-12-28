import { IService, Service } from './service.model';
import { model, Schema, Types } from 'mongoose';

export interface IAppointment extends Document {
  id: string;
  name: string;
  country: string;
  email: string;
  phone: string;
  start: Date;
  end: Date;
  confirmed: boolean;
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
