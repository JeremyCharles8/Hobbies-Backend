import express from 'express';

import { userController } from '../conrollers/index.controller';
import cw from '../middlewares/wrapper.middleware';
import validator from '../middlewares/validation.middleware';
import createUserSchema from '../Schemas/createUser.schema';

const router = express.Router();

router.route('/signup')
  .get(
    validator(createUserSchema, 'body'),
    cw(userController.create)
  );

export default router;
