import express from 'express';

import userController from '../conrollers/users.controller';
import cw from '../middlewares/wrapper.middleware';

const router = express.Router();

router.route('/signup')
  .get(cw(userController.store));

export default router;
