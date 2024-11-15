import express from 'express';

import { userController } from '../conrollers/index.controller';
import cw from '../middlewares/wrapper.middleware';

const router = express.Router();

router.route('/signup')
  .get(cw(userController.create));

export default router;
