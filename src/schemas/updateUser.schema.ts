import Joi from 'joi';

import { UpdateUser } from '../types/user.type.ts';

export default Joi.object<UpdateUser>({
  nickname: Joi.string().min(3).max(30).optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .optional(),
  password: Joi.string()
    .min(8)
    .max(64)
    .pattern(
      new RegExp(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
      ),
    )
    .optional()
    .message(
      'Password must contain at least 8 characters including uppercase, lowercase, number and special characters',
    ),
  repeatPassword: Joi.string().valid(Joi.ref('password')).optional().messages({
    'any.only': 'Password and repeated password must be the same',
  }),
  img: Joi.string().optional(),
});
