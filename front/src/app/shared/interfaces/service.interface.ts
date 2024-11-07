import { Entity } from './entity.interface';
import { Asset } from './asset.interface';

export interface Service extends Entity {
  name: string;
  title: string;
  description: string;
  price: number;
  checkList: string[];
  tags: string[];
  asset?: Asset;
}
