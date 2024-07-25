import jwt from 'jsonwebtoken';
import prisma from './prismaClient';
import { AccessTokenError, AuthFailureError } from '../core/ApiError';
import { INVALID_TOKEN } from '../constants/errorMessages';
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

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });
    if (!user) throw new AccessTokenError(INVALID_TOKEN);

    if (
      user.lastLogout &&
      decoded.iat &&
      decoded.iat < user.lastLogout.getTime() / 1000
    ) {
      throw new AccessTokenError(INVALID_TOKEN);
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
