import { Router } from 'express';
import { createOrUpdateAsset, deleteAsset, getAsset, getAssets } from '../controllers/assets.controller';

const router = Router();

router.route('/').get(getAssets);

router.route('/:path/:id').post(createOrUpdateAsset);

router.route('/:id').get(getAsset).delete(deleteAsset);

export const assetRoutes = router;
