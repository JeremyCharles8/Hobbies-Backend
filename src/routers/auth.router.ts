import express from 'express';

import authController from '../conrollers/Auth.controller.ts';
import cw from '../middlewares/wrapper.middleware.ts';
import validator from '../middlewares/validation.middleware.ts';

import signinSchema from '../schemas/signin.schema.ts';

import { LoginInput } from '../types/user.type.ts';

const router = express.Router();

router
  .route('/signin')
  /**
   * Authenticate user
   * @param {LoginInput} request.body.required - User's login informations
   * @return {Response} 200 - Successfully logged
   * @return {ApiError} 401 - Incorrect email or password
   * @return {ApiError} 500 - Internal server error
   */
  .post(validator(signinSchema, 'body'), cw(authController.login));

router
  .route('/logout')
  /**
   * Disconnect user
   * @return {Response} 200 - Successfully logged out
   * @return {ApiError} 404 - User not found
   * @return {ApiError} 500 - Internal server error
   */
  .post(cw(authController.logout));

export default router;
