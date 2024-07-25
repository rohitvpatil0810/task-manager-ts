import { Router } from 'express';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/me', authenticate, (req, res) => {
  res.send(res.locals.user);
});

export default router;
