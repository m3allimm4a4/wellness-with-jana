import { Router } from 'express';
import { getContactInfo, saveContactInfo, sendMessage } from '../controllers/contact-info.controller';
import { auth } from '../middlewares/auth.middleware';
import { UserRole } from '../models/user.model';

const router = Router();

router
  .route('/')
  .get(getContactInfo)
  .post(auth([UserRole.ADMIN]), saveContactInfo);
router.route('/send-message').post(sendMessage);

export const contactInfoRoutes = router;
