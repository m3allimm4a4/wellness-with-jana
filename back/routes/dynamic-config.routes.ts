import { Router } from 'express';
import { addOrUpdateConfig, deleteConfig, getDynamicConfigs } from '../controllers/dynamic-config.controller';

const router = Router();

router.route('/').get(getDynamicConfigs);
router.route('/:name').post(addOrUpdateConfig).delete(deleteConfig);

export const dynamicConfigRoutes = router;
