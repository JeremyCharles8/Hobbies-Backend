import express from "express";

import usersRouter from './users.router';

const router = express.Router();

router.use ('/api', usersRouter);

export default router;
