import { Router } from 'express';
import {
  createTestemonial,
  deleteTestemonial,
  getTestemonial,
  getTestemonials,
  updateTestemonial,
} from '../controllers/testemonials.controller';
import { auth } from '../middlewares/auth.middleware';
import { UserRole } from '../models/user.model';

const router = Router();

router
  .route('/')
  .get(getTestemonials)
  .post(auth([UserRole.ADMIN]), createTestemonial);

router
  .route('/:id')
  .get(getTestemonial)
  .put(auth([UserRole.ADMIN]), updateTestemonial)
  .delete(auth([UserRole.ADMIN]), deleteTestemonial);

export const testemonialRoutes = router;
