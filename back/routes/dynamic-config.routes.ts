import { Router } from 'express';
import {
  addOrUpdateConfig,
  deleteConfig,
  getDynamicConfigById,
  getDynamicConfigs,
} from '../controllers/dynamic-config.controller';
import { auth } from '../middlewares/auth.middleware';
import { UserRole } from '../models/user.model';

const router = Router();

router.route('/').get(getDynamicConfigs);
router
  .route('/:name')
  .get(getDynamicConfigById)
  .post(auth([UserRole.ADMIN]), addOrUpdateConfig)
  .delete(auth([UserRole.ADMIN]), deleteConfig);

export const dynamicConfigRoutes = router;
