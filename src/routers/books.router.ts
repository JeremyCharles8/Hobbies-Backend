import express from 'express';

import auth from '../middlewares/auth.middleware.ts';
import cw from '../middlewares/wrapper.middleware.ts';
import validator from '../middlewares/validation.middleware.ts';
import extApiController from '../conrollers/ExtApi.controller.ts';
import itemTitleSchema from '../schemas/itemTitle.schema.ts';

const router = express.Router();

router
  /**
   * Fetch external api to get list of books corresponding to input title
   * @param {string} req.body.required - Book's title to look for
   * @return {BookComicChoices} 200 - List of items containing key, title and author's name
   * @return {ApiError} 500 - Internal server Error
   * @return {ApiError} 404 - Unknown title, resource not found
   */
  .route('/list')
  .get(
    validator(itemTitleSchema, 'body'),
    cw(extApiController.getBookComicList),
  );
export default router;
