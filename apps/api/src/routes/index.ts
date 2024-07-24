import { NextFunction, Request, Response, Router } from 'express';
import { SuccessMsgResponse } from '../core/ApiResponse';
import authRoutes from './authRoutes';
const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    new SuccessMsgResponse('Welcome to the Task Manager API! 🚀').send(res);
  } catch (error) {
    next(error);
  }
});

router.use('/auth', authRoutes);

export default router;
