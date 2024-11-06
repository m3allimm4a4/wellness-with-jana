import { Entity } from './entity.interface';

export interface Asset extends Entity {
  name: string;
  type: AssetType;
  path: string;
}

export enum AssetType {
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
}
