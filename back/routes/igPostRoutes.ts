import { Router } from 'express';
import {
  createIgPost,
  deleteIgPost,
  getIgPost,
  getIgPosts,
  updateIgPost,
  updateIgPostAsset,
} from '../controllers/ig-posts.controller';
import { auth } from '../middlewares/auth.middleware';
import { UserRole } from '../models/user.model';

const router = Router();

router
  .route('/')
  .get(getIgPosts)
  .post(auth([UserRole.ADMIN]), createIgPost);

router
  .route('/:id')
  .get(getIgPost)
  .post(auth([UserRole.ADMIN]), updateIgPostAsset)
  .put(auth([UserRole.ADMIN]), updateIgPost)
  .delete(auth([UserRole.ADMIN]), deleteIgPost);

export const igPostRoutes = router;
