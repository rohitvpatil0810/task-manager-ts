import { Request, Response, NextFunction } from 'express';
import Logger from '../core/Logger';
import { SuccessResponse } from '../core/ApiResponse';
import { USER_PROFILE_FETCHED } from '../constants/successMessages';

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;

    return new SuccessResponse(USER_PROFILE_FETCHED, user).send(res);
  } catch (error) {
    Logger.error('Error in getProfile controller: ', error);
  }
};
