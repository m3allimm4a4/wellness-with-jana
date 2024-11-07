import { Router } from 'express';
import {
  createOrUpdateLabel,
  createOrUpdateLabels,
  deleteLabel,
  getLabel,
  getLabels,
} from '../controllers/labels.controller';

const router = Router();

router.route('/').get(getLabels).post(createOrUpdateLabels);

router.route('/:id').get(getLabel).post(createOrUpdateLabel).delete(deleteLabel);

export const labelRoutes = router;
