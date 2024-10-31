import { Router } from 'express';
import { createOrUpdateLabel, deleteLabel, getLabel, getLabels } from '../controllers/labels.controller';

const router = Router();

router.route('/').get(getLabels);

router.route('/:id').get(getLabel).post(createOrUpdateLabel).delete(deleteLabel);

export const labelRoutes = router;
