import { Entity } from './entity.interface';

export interface Label extends Entity {
  id: string;
  name: string;
  en: string;
  createdAt: string;
  updatedAt: string;
}
