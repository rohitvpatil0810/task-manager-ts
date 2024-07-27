import { Request, Response, NextFunction } from 'express';
import Logger from '../core/Logger';
import {
  googleSigninValidation,
  loginValidation,
  signUpValidation,
} from '../validations/authValidation';
import { validateData } from '../utils/dataValidator';
import * as authService from '../services/authService';
import { SuccessMsgResponse, SuccessResponse } from '../core/ApiResponse';
import {
  GOOGLE_SIGNUP_SUCCESS,
  LOGOUT_SUCCESS,
  SIGNUP_SUCCESS,
  USER_PROFILE_FETCHED,
} from '../constants/successMessages';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { value, error } = validateData(req.body, loginValidation);

    if (error) return error.send(res);

    const { email, password } = value;
    const data = await authService.login(email, password);

    return new SuccessResponse('Login successful', data).send(res);
  } catch (error) {
    Logger.error('Error in login (controller): ', error);
    next(error);
  }
};

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { value, error } = validateData(req.body, signUpValidation);
    if (error) return error.send(res);

    const user = await authService.signUp(value);

    return new SuccessResponse(SIGNUP_SUCCESS, user).send(res);
  } catch (error) {
    Logger.error('Error in signUp (controller): ', error);
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = res.locals.user?.id;

    await authService.logout(userId);

    return new SuccessMsgResponse(LOGOUT_SUCCESS).send(res);
  } catch (error) {
    Logger.error('Error in logout (controller): ', error);
    next(error);
  }
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;

    return new SuccessResponse(USER_PROFILE_FETCHED, user).send(res);
  } catch (error) {
    Logger.error('Error in me (controller): ', error);
    next(error);
  }
};

export const googleSignup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { value, error } = validateData(req.body, googleSigninValidation);
    if (error) return error.send(res);

    const { tokenId } = value;

    const data = await authService.googleSignup(tokenId);

    return new SuccessResponse(GOOGLE_SIGNUP_SUCCESS, data).send(res);
  } catch (error) {
    Logger.error('Error in googleSignup (controller): ', error);
    next(error);
  }
};
