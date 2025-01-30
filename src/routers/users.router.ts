import express from 'express';

import { userController } from '../conrollers/index.controller.ts';
import cw from '../middlewares/wrapper.middleware.ts';
import validator from '../middlewares/validation.middleware.ts';
import createUserSchema from '../schemas/createUser.schema.ts';
import updateUserSchema from '../schemas/updateUser.schema.ts';

const router = express.Router();

router
  .route('/')
  /**
   * Create new user
   * @param {CreateUser} request.body.required User's informations
   * @return {Response} 201 - User created successfully
   * @return {ApiError} 400 - Bad request (validation error)
   * @return {ApiError} 409 - Email already exists
   * @return {ApiError} 409 - Nickname already exists
   * @return {ApiError} 500 - Internal server error
   */
  .post(
    validator(createUserSchema, 'body'),
    cw(userController.create.bind(userController)),
  )
  /**
   * Update user's informations
   * @param {UpdateUser} request.body.required User's infomation(s) to update
   * @return {User} 200 - User with updated inforamtion(s)
   * @return {ApiError} 404 - User not found
   * @return {ApiError} 409 - Email already exists
   * @return {ApiError} 409 - Nickname already exists
   * @return {ApiError} 500 - Internal server error
   */
  .patch(
    validator(updateUserSchema, 'body'),
    cw(userController.update.bind(userController)),
  )
  /**
   * Delete an user in database
   * @return {Response} 204
   * @return {ApiError} 404 - User not found
   * @return {ApiError} 500 - Internal server error
   */
  .delete(cw(userController.delete.bind(userController)));

export default router;
