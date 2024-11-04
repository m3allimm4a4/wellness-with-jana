import { Router } from 'express';
import { createOrUpdateAsset, deleteAsset, getAsset, getAssets } from '../controllers/assets.controller';

const router = Router();

router.route('/').get(getAssets);

router.route('/:id').get(getAsset).post(createOrUpdateAsset).delete(deleteAsset);

export const assetRoutes = router;
