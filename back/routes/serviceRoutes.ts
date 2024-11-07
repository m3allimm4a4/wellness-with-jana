import { Router } from 'express';
import {
  createService,
  deleteService,
  getService,
  getServices,
  updateService,
  updateServiceAsset,
} from '../controllers/services.controller';

const router = Router();

router.route('/').get(getServices).post(createService);

router.route('/:id').get(getService).post(updateServiceAsset).put(updateService).delete(deleteService);

export const serviceRoutes = router;
