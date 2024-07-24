import { Router } from 'express';
import * as authController from '../controllers/authController';
import { authenticate } from '../middleware/authMiddleware';
const router = Router();

router.post('/login', authController.login);
router.post('/signup', authController.signUp);
router.post('/logout', authenticate, authController.logout);
router.post('/google', (req, res) => {
  // Google login logic here
});

export default router;
