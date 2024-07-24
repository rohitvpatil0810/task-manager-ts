import jwt from 'jsonwebtoken';
import prisma from './prismaClient';
import { AuthFailureError } from '../core/ApiError';
import { INVALID_TOKEN, USER_NOT_FOUND } from '../constants/errorMessages';
import Logger from '../core/Logger';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '8hr',
  });
};

export const verifyToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

    console.log('decoded:', decoded);
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });
    if (!user) throw new AuthFailureError(USER_NOT_FOUND);

    console.log('user:', user.lastLogout?.getTime());

    if (
      user.lastLogout &&
      decoded.iat &&
      decoded.iat < user.lastLogout.getTime() / 1000
    ) {
      console.log('Already logged out');
      throw new AuthFailureError(INVALID_TOKEN);
    }

    return user;
  } catch (error) {
    Logger.error('Error in verifyToken utils:', error);
    if (
      error instanceof jwt.TokenExpiredError ||
      error instanceof jwt.JsonWebTokenError
    ) {
      throw new AuthFailureError(INVALID_TOKEN);
    } else {
      throw error;
    }
  }
};
