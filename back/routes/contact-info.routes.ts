import { Router } from 'express';
import { getContactInfo, saveContactInfo, sendMessage } from '../controllers/contact-info.controller';

const router = Router();

router.route('/').get(getContactInfo).post(saveContactInfo);
router.route('/send-message').post(sendMessage);

export const contactInfoRoutes = router;
