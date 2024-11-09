import { Router } from 'express';
import { getContactInfo, saveContactInfo } from '../controllers/contact-info.controller';

const router = Router();

router.route('/').get(getContactInfo).post(saveContactInfo);

export const contactInfoRoutes = router;
