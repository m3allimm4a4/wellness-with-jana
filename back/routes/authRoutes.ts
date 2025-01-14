import { Router } from 'express';
import {
  forgotPassword,
  login,
  logout,
  passwordReset,
  refresh,
  signUp,
  verifyEmail,
} from '../controllers/auth.controller';

const router = Router();

router.route('/sign-up').post(signUp);
router.route('/verify-email').patch(verifyEmail);
router.route('/login').post(login);
router.route('/refresh').get(refresh);
router.route('/logout').delete(logout);
router.route('/forgot-password').post(forgotPassword);
router.route('/password-reset').post(passwordReset);

export const authRoutes = router;
