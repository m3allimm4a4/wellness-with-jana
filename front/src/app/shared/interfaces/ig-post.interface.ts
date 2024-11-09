import { Entity } from './entity.interface';
import { Asset } from './asset.interface';

export interface IgPost extends Entity {
  url: string;
  asset?: Asset;
}
