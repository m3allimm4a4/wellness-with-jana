import { Entity } from './entity.interface';
import { Service } from './service.interface';

export interface Appointment extends Entity {
  name: string;
  country: string;
  email: string;
  phone: string;
  start: Date;
  end: Date;
  confirmed?: boolean;
  service?: Service;
}
