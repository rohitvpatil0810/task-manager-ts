import { TaskStatus } from '@prisma/client';
import Joi from 'joi';

export const getTaskValidation = Joi.object({
  id: Joi.string().hex().required().length(24),
});

export const createTaskValidation = Joi.object({
  title: Joi.string().required().min(3).max(30).trim(),
  description: Joi.string().required().min(3).max(100).trim(),
});

export const updateTaskValidation = Joi.object({
  id: Joi.string().hex().required().length(24),
  title: Joi.string().min(3).max(30).trim(),
  description: Joi.string().min(3).max(100).trim(),
});

export const changeStatusValidation = Joi.object({
  id: Joi.string().hex().required().length(24),
  status: Joi.string()
    .valid(TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE)
    .required(),
});

export const deleteTaskValidation = updateTaskValidation;
