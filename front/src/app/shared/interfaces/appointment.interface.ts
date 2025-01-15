import { Entity } from './entity.interface';
import { Service } from './service.interface';
import { User } from './user.interface';

export interface Appointment extends Entity {
  user: User;
  start: Date;
  end: Date;
  confirmed?: boolean;
  service?: Service;
}

export interface AppointmentResponse extends Entity {
  user: User;
  start: Date;
  end: Date;
  confirmed?: boolean;
  service?: Service;
}
