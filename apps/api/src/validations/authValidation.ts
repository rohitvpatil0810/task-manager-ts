import Joi from 'joi';

export const signUpValidation = Joi.object({
  firstName: Joi.string().required().min(3).max(30).lowercase(),
  lastName: Joi.string().required().min(3).max(30).lowercase(),
  email: Joi.string().email().required().lowercase(),
  password: Joi.string().required().min(6).max(30),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')),
});

export const loginValidation = Joi.object({
  email: Joi.string().email().required().lowercase(),
  password: Joi.string().required(),
});
