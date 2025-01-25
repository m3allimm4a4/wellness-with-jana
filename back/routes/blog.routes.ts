import { uploadAsset } from '../controllers/blogs.controller';
import { Router } from 'express';

const router = Router();

router.route('/:id/assets').post(uploadAsset);

export const blogRoutes = router;
