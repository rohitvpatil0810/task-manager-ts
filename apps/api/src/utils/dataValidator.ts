import Joi from 'joi';
import validationErrorFormator from './validationErrorFormator';
import { BAD_REQUEST } from '../constants/errorMessages';
import { BadRequestResponse } from '../core/ApiResponse';

export const validateData = (
  data: any,
  schema: Joi.Schema,
): { value: any; error: BadRequestResponse<Record<string, string>> | null } => {
  const { value, error } = schema.validate(data, {
    abortEarly: false,
  });

  if (error) {
    const errors = validationErrorFormator(error.details);
    return { value: null, error: new BadRequestResponse(BAD_REQUEST, errors) };
  }

  return { value, error: null };
};
