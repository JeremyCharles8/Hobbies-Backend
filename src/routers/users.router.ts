import express from 'express';

import { userController } from '../conrollers/index.controller.ts';
import cw from '../middlewares/wrapper.middleware.ts';
import validator from '../middlewares/validation.middleware.ts';
import createUserSchema from '../schemas/createUser.schema.ts';

const router = express.Router();

router
  .route('/')
  .post(
    validator(createUserSchema, 'body'),
    cw(userController.create.bind(userController)),
  );

router
  .route('/profile')
  /**
   * Delete an user in database
   * @return {Response} 204
   * @return {ApiError} 404 - User not found
   * @return {ApiError} 500 - Internal server error
   */
  .delete(cw(userController.delete.bind(userController)));
export default router;
