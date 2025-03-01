import express from 'express';

import usersRouter from './users.router.ts';
import booksRouter from './books.router.ts';
import authRouter from './auth.router.ts';
import errorHandler from '../middlewares/errorHandler.middleware.ts';

const router = express.Router();

router.use('/api/users', usersRouter);
router.use('/api/books/', booksRouter);
router.use('/api/auth', authRouter);

router.use(errorHandler);

export default router;
