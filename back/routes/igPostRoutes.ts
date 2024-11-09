import { Router } from 'express';
import {
  createIgPost,
  deleteIgPost,
  getIgPost,
  getIgPosts,
  updateIgPost,
  updateIgPostAsset,
} from '../controllers/ig-posts.controller';

const router = Router();

router.route('/').get(getIgPosts).post(createIgPost);

router.route('/:id').get(getIgPost).post(updateIgPostAsset).put(updateIgPost).delete(deleteIgPost);

export const igPostRoutes = router;
