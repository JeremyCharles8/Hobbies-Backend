import Joi from 'joi';

import { CreateUser } from '../types/user.type';

export default Joi.object<CreateUser>({
  nickname: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({'any.required': 'Nickname is required'}),
  email: Joi.string()
    .email({minDomainSegments: 2, tlds: {allow: false}})
    .required()
    .messages({'any.required': 'Email is required'}),
  password: Joi.string()
    .min(8)
    .max(64)
    //TODO pattern regex
    .required()
    .messages({
      'string.pattern.base': 'Password must contain at least 8 characters including uppercase, lowercase, number and special characters',
      'any.required': 'Password is required'
    }),
  repeatPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({'any.only': 'Password and repeated password must be the same'}),
});
