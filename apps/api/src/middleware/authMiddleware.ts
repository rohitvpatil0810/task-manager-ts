import { Request, Response, NextFunction } from 'express';
import Logger from '../core/Logger';
import { AccessTokenError, AuthFailureError } from '../core/ApiError';
import { INVALID_TOKEN } from '../constants/errorMessages';
import { verifyToken } from '../utils/tokenUtils';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new AccessTokenError(INVALID_TOKEN);
    }

    const decoded = await verifyToken(token);
    res.locals.user = decoded;
    next();
  } catch (error) {
    Logger.error('Error in authenticate middleware: ', error);
    next(error);
  }
};
