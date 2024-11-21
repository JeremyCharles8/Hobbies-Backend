import express from "express";

import usersRouter from './users.router.ts';
import errorHandler from "../middlewares/errorHandler.middleware.ts";

const router = express.Router();

router.use ('/api/users', usersRouter);

router.use(errorHandler);

export default router;
