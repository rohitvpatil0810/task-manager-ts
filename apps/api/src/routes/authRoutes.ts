import { Router } from 'express';
import * as authController from '../controllers/authController';
import { authenticate } from '../middleware/authMiddleware';
const router = Router();

router.post('/login', authController.login);
router.post('/signup', authController.signUp);
router.post('/logout', authenticate, authController.logout);
router.get('/me', authenticate, authController.me);
router.post('/google', authController.googleSignup);

export default router;
