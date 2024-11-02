import { Entity } from './entity.interface';

export interface Service extends Entity {
  name: string;
  title: string;
  description: string;
  price: number;
  imagePath: string;
  checkList: string[];
  tags: string[];
}
