import { Router } from 'express';
import { login, signUp, verifyEmail } from '../controllers/auth.controller';

const router = Router();

router.route('/login').post(login);
router.route('/sign-up').post(signUp);
router.route('/verify-email').patch(verifyEmail);

export const authRoutes = router;
