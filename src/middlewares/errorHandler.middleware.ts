import { ErrorRequestHandler } from 'express';
import ApiError from '../errors/Api.error.ts';
import logger from '../helpers/logger.helper.ts';

import { JoiErr } from '../types/joiError.type.ts';
import { JsonWebTokenError, NotBeforeError } from 'jsonwebtoken';

const errorHandler: ErrorRequestHandler = (
  err: ApiError,
  _req,
  res,
  _next,
): void => {
  logger.error(err);
  let { status, message } = err;

  if (err.name === 'JsonWebTokenError' || err.name === 'NotBeforeError') {
    message = 'Unauthorized, invalid token';
    status = 401;
  }

  if (err.name === 'ValidationError') {
    const validationErr = err as unknown as JoiErr;
    message = `Bad Request / ${validationErr.details.map((detail) => detail.message)}`;
    status = 400;
  }

  if (!status) {
    status = 500;
  }

  if (status === 500) {
    message = 'Internal Server Error';
  }

  res.status(status).json({ error: message });
};

export default errorHandler;
