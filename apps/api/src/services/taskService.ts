import prisma from '../utils/prismaClient';
import Logger from '../core/Logger';
import { NotFoundError } from '../core/ApiError';
import { TASK_NOT_FOUND, TASKS_NOT_FOUND } from '../constants/errorMessages';
import { Prisma, TaskStatus } from '@prisma/client';

export const createTask = async (
  userId: string,
  title: string,
  description: string,
) => {
  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId,
      },
    });

    return task;
  } catch (error) {
    Logger.error('Error in createTask (controller): ', error);
    throw error;
  }
};

export const getTasks = async (
  userId: string,
  filter: { query: string; status: TaskStatus } | undefined,
) => {
  console.log('getTasks', filter);
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId,
        OR: [
          {
            title: {
              contains: filter?.query,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: filter?.query,
              mode: 'insensitive',
            },
          },
        ],
        status: filter?.status,
      },
      orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
    });

    if (tasks.length === 0) {
      throw new NotFoundError(TASKS_NOT_FOUND);
    }

    return tasks;
  } catch (error) {
    Logger.error('Error in getTasks (controller): ', error);
    throw error;
  }
};

export const getTask = async (userId: string, id: string) => {
  try {
    const task = await prisma.task.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!task) {
      throw new NotFoundError(TASK_NOT_FOUND);
    }

    return task;
  } catch (error) {
    Logger.error('Error in getTask (controller): ', error);
    throw error;
  }
};

export const updateTask = async (
  userId: string,
  id: string,
  title: string,
  description: string,
) => {
  try {
    const task = await prisma.task.update({
      where: {
        id,
        userId,
      },
      data: {
        title,
        description,
      },
    });

    return task;
  } catch (error) {
    Logger.error('Error in updateTask (controller): ', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new NotFoundError(TASK_NOT_FOUND);
      }
    }
    throw error;
  }
};

export const deleteTask = async (userId: string, id: string) => {
  try {
    const task = await prisma.task.delete({
      where: {
        id,
        userId,
      },
    });

    return task;
  } catch (error) {
    Logger.error('Error in deleteTask (controller): ', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new NotFoundError(TASK_NOT_FOUND);
      }
    }
    throw error;
  }
};

export const changeStatus = async (
  userId: string,
  id: string,
  status: TaskStatus,
) => {
  try {
    const task = await prisma.task.update({
      where: {
        id,
        userId,
      },
      data: {
        status,
      },
    });

    return task;
  } catch (error) {
    Logger.error('Error in changeStatus (controller): ', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new NotFoundError(TASK_NOT_FOUND);
      }
    }
    throw error;
  }
};
