import { Entity } from './entity.interface';
import { Asset } from './asset.interface';

export interface Blog extends Entity {
  title: string;
  tag: string;
  author: string;
  content?: string;
  related?: Blog[] | string[];
  bannerAsset?: Asset;
  contentImages?: string[];
}
