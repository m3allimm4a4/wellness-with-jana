import { Router } from 'express';
import {
  addOrUpdateConfig,
  deleteConfig,
  getDynamicConfigById,
  getDynamicConfigs,
} from '../controllers/dynamic-config.controller';

const router = Router();

router.route('/').get(getDynamicConfigs);
router.route('/:name').get(getDynamicConfigById).post(addOrUpdateConfig).delete(deleteConfig);

export const dynamicConfigRoutes = router;
