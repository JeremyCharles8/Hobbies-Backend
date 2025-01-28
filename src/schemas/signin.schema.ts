import Joi from 'joi';

import { LoginInput } from '../types/user.type.ts';

export default Joi.object<LoginInput>({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .required()
    .messages({ 'any.required': 'Email is required' }),
  password: Joi.string()
    .min(8)
    .max(64)
    .pattern(
      new RegExp(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
      ),
    )
    .required()
    .messages({
      'string.pattern.base':
        'Password must contain at least 8 characters including uppercase, lowercase, number and special characters',
      'any.required': 'Password is required',
    }),
});
