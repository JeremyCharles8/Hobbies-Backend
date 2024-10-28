import express from 'express';

import userController from '../conrollers/users.controller';

const router = express.Router();

router.route('/signup')
  .get(userController.store);

export default router;
