import { addBlog, getBlog, getBlogs, patchBlog, uploadAsset } from '../controllers/blogs.controller';
import { Router } from 'express';

const router = Router();

router.route('/').get(getBlogs).post(addBlog);
router.route('/:id').get(getBlog).patch(patchBlog);
router.route('/:id/assets').post(uploadAsset);

export const blogRoutes = router;
