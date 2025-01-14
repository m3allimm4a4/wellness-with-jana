import { Router } from 'express';
import {
  createService,
  deleteService,
  getService,
  getServices,
  updateService,
  updateServiceAsset,
} from '../controllers/services.controller';
import { auth } from '../middlewares/auth.middleware';
import { UserRole } from '../models/user.model';

const router = Router();

router
  .route('/')
  .get(getServices)
  .post(auth([UserRole.ADMIN]), createService);

router
  .route('/:id')
  .get(getService)
  .post(auth([UserRole.ADMIN]), updateServiceAsset)
  .put(auth([UserRole.ADMIN]), updateService)
  .delete(auth([UserRole.ADMIN]), deleteService);

export const serviceRoutes = router;
