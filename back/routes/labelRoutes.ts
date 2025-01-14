import { Router } from 'express';
import {
  createOrUpdateLabel,
  createOrUpdateLabels,
  deleteLabel,
  getLabel,
  getLabels,
} from '../controllers/labels.controller';
import { auth } from '../middlewares/auth.middleware';
import { UserRole } from '../models/user.model';

const router = Router();

router
  .route('/')
  .get(getLabels)
  .post(auth([UserRole.ADMIN]), createOrUpdateLabels);

router
  .route('/:id')
  .get(getLabel)
  .post(auth([UserRole.ADMIN]), createOrUpdateLabel)
  .delete(auth([UserRole.ADMIN]), deleteLabel);

export const labelRoutes = router;
