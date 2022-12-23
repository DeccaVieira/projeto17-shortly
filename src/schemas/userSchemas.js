import joi from "joi";

export const signUpSchema = joi.object({
  name: joi.string().required().min(3).max(100),
  email: joi.string().email().required(),
  password: joi.string().required(),
  confirmPassword: joi.string().required(),
});

export const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
