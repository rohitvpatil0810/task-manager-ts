import Joi from 'joi';

export const signUpValidation = Joi.object({
  firstName: Joi.string().required().min(3).max(30).lowercase().trim(),
  lastName: Joi.string().required().min(3).max(30).lowercase().trim(),
  email: Joi.string().email().required().lowercase().trim(),
  password: Joi.string().required().min(6).max(30).trim(),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).trim(),
});

export const loginValidation = Joi.object({
  email: Joi.string().email().required().lowercase().trim(),
  password: Joi.string().required().trim(),
});

export const googleSigninValidation = Joi.object({
  tokenId: Joi.string().required().trim(),
});
