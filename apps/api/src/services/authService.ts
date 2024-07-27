import prisma from '../utils/prismaClient';
import Logger from '../core/Logger';
import {
  AuthFailureError,
  BadRequestError,
  InternalError,
  NotFoundError,
} from '../core/ApiError';
import {
  INVALID_CREDENTIALS,
  USER_ALREADY_EXISTS,
  USER_NOT_FOUND,
} from '../constants/errorMessages';
import { comparePassword, hashPassword } from '../utils/passwordUtils';
import { generateToken } from '../utils/tokenUtils';
import googleOauthClient, {
  GOOGLE_CLIENT_ID,
} from '../utils/googleOauthClient';

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    Logger.error('Error in getUserByEmail (service): ', error);
    throw error;
  }
};

const getUserByGoogleId = async (googleId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        googleId,
      },
    });

    return user;
  } catch (error) {
    Logger.error('Error in getUserByGoogleId (service): ', error);
    throw error;
  }
};

export const signUp = async (data: SignUpData) => {
  try {
    const user = await prisma.$transaction(async (tx) => {
      const existingUser = await getUserByEmail(data.email);
      if (existingUser) throw new BadRequestError(USER_ALREADY_EXISTS);

      const hashedPassword = await hashPassword(data.password);

      const newUser = await tx.user.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          hashedPassword: hashedPassword,
        },
      });

      return newUser;
    });

    return user;
  } catch (error) {
    Logger.error('Error in signUp (service): ', error);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const user = await getUserByEmail(email);
    if (!user) throw new NotFoundError(INVALID_CREDENTIALS);

    const isMatch = await comparePassword(password, user.hashedPassword!);
    if (!isMatch) throw new AuthFailureError(INVALID_CREDENTIALS);

    const token = generateToken(user.id);

    return { user, token };
  } catch (error) {
    Logger.error('Error in login (service): ', error);
    throw error;
  }
};

export const logout = async (userId: string) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        lastLogout: new Date(),
      },
    });

    return user;
  } catch (error) {
    Logger.error('Error in logout (service): ', error);
    throw error;
  }
};

export const googleSignup = async (tokenId: string) => {
  try {
    const ticket = await googleOauthClient.verifyIdToken({
      idToken: tokenId,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (!payload) throw new InternalError();

    // Check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ googleId: payload.sub }, { email: payload.email! }],
      },
    });

    const user = await prisma.user.upsert({
      where: {
        id: existingUser?.id,
      },
      create: {
        email: payload.email!,
        firstName: payload.given_name!.toLowerCase(),
        lastName: payload.family_name!.toLowerCase(),
        googleId: payload.sub,
      },
      update: {
        email: payload.email,
        firstName: payload.given_name?.toLowerCase(),
        lastName: payload.family_name?.toLowerCase(),
        googleId: payload.sub,
      },
    });

    const token = generateToken(user.id);

    return { user, token };
  } catch (error) {
    Logger.error('Error in googleSignup (service): ', error);
    throw error;
  }
};
