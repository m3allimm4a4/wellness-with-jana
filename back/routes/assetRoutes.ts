import { Router } from 'express';
import { createOrUpdateAsset, deleteAsset, getAsset, getAssets } from '../controllers/assets.controller';
import { auth } from '../middlewares/auth.middleware';
import { UserRole } from '../models/user.model';

const router = Router();

router.route('/').get(getAssets);

router.route('/:path/:id').post(auth([UserRole.ADMIN]), createOrUpdateAsset);

router
  .route('/:id')
  .get(getAsset)
  .delete(auth([UserRole.ADMIN]), deleteAsset);

export const assetRoutes = router;
