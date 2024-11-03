import { Router } from 'express';
import {
  createTestemonial,
  deleteTestemonial,
  getTestemonial,
  getTestemonials,
  updateTestemonial,
} from '../controllers/testemonials.controller';

const router = Router();

router.route('/').get(getTestemonials).post(createTestemonial);

router.route('/:id').get(getTestemonial).put(updateTestemonial).delete(deleteTestemonial);

export const testemonialRoutes = router;
