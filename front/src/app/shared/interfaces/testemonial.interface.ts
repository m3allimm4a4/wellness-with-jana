import { Entity } from './entity.interface';

export interface Testemonial extends Entity {
  description: string;
  clientName: string;
  city: string;
  country: string;
  tags: string[];
}
