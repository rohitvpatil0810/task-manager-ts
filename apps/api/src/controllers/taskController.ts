import { Request, Response, NextFunction } from 'express';
import Logger from '../core/Logger';
import { validateData } from '../utils/dataValidator';
import {
  changeStatusValidation,
  createTaskValidation,
  deleteTaskValidation,
  getTasksValidation,
  getTaskValidation,
  updateTaskValidation,
} from '../validations/taskValidation';
import * as taskService from '../services/taskService';
import { SuccessMsgResponse, SuccessResponse } from '../core/ApiResponse';
import {
  TASK_CREATED,
  TASK_DELETED,
  TASK_FETCHED,
  TASK_UPDATED,
  TASKS_FETCHED,
} from '../constants/successMessages';

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { value, error } = validateData(req.body, createTaskValidation);
    if (error) return error.send(res);

    const userId = res.locals.user.id;
    const { title, description } = value;

    const data = await taskService.createTask(userId, title, description);

    return new SuccessResponse(TASK_CREATED, data).send(res);
  } catch (error) {
    Logger.error('Error in createTask (controller): ', error);
    next(error);
  }
};

export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { value, error } = validateData(req.query, getTasksValidation);
    if (error) return error.send(res);

    const userId = res.locals.user.id;

    const { query, status } = value;

    const data = await taskService.getTasks(userId, { query, status });

    return new SuccessResponse(TASKS_FETCHED, data).send(res);
  } catch (error) {
    Logger.error('Error in getTasks (controller): ', error);
    next(error);
  }
};

export const getTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { value, error } = validateData(req.params, getTaskValidation);
    if (error) return error.send(res);

    const userId = res.locals.user.id;

    const { id } = value;
    const data = await taskService.getTask(userId, id);
    return new SuccessResponse(TASK_FETCHED, data).send(res);
  } catch (error) {
    Logger.error('Error in getTask (controller): ', error);
    next(error);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { value, error } = validateData(
      { ...req.params, ...req.body },
      updateTaskValidation,
    );
    if (error) return error.send(res);

    const { id, title, description } = value;
    const userId = res.locals.user.id;

    const data = await taskService.updateTask(userId, id, title, description);

    return new SuccessResponse(TASK_UPDATED, data).send(res);
  } catch (error) {
    Logger.error('Error in updateTask (controller): ', error);
    next(error);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { value, error } = validateData(req.params, deleteTaskValidation);
    if (error) return error.send(res);

    const userId = res.locals.user.id;
    const { id } = value;

    await taskService.deleteTask(userId, id);

    return new SuccessMsgResponse(TASK_DELETED).send(res);
  } catch (error) {
    Logger.error('Error in deleteTask (controller): ', error);
    next(error);
  }
};

export const changeStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { value, error } = validateData(
      { ...req.params, ...req.body },
      changeStatusValidation,
    );
    if (error) return error.send(res);

    const userId = res.locals.user.id;
    const { id, status } = value;

    const data = await taskService.changeStatus(userId, id, status);

    return new SuccessResponse(TASK_UPDATED, data).send(res);
  } catch (error) {
    Logger.error('Error in changeStatus (controller): ', error);
    next(error);
  }
};
