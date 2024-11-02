import { Router } from 'express';
import {
  createService,
  deleteService,
  getService,
  getServices,
  updateService,
} from '../controllers/services.controller';

const router = Router();

router.route('/').get(getServices).post(createService);

router.route('/:id').get(getService).put(updateService).delete(deleteService);

export const serviceRoutes = router;
