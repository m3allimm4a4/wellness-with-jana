import { Router } from 'express';
import { login, logout, refresh, signUp, verifyEmail } from '../controllers/auth.controller';

const router = Router();

router.route('/sign-up').post(signUp);
router.route('/verify-email').patch(verifyEmail);
router.route('/login').post(login);
router.route('/refresh').get(refresh);
router.route('/logout').patch(logout);

export const authRoutes = router;
