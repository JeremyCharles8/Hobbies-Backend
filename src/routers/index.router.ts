import express from "express";

import usersRouter from './users.router';
import errorHandler from "../middlewares/errorHandler.middleware";

const router = express.Router();

router.use ('/api', usersRouter);

router.use(errorHandler);

export default router;
