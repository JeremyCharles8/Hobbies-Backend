import express from 'express';

import { userController } from '../conrollers/index.controller.ts';
import cw from '../middlewares/wrapper.middleware.ts';
import validator from '../middlewares/validation.middleware.ts';
import createUserSchema from '../schemas/createUser.schema.ts';

const router = express.Router();

router.route('/signup')
  .post(
    validator(createUserSchema, 'body'),
    cw(userController.create.bind(userController))
  );

export default router;
