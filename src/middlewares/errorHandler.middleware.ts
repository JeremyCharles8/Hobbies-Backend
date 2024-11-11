import { Request, Response, NextFunction } from "express";
import ApiError from '../errors/Api.error';

import { JoiErr } from "../types/joiError.type";
//TODO Type for Promise
export default (err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
  let { status, message } = err;

  if(err.name === 'ValidationError'){
    const validationErr = err as unknown as JoiErr;
    message = `Bad Request / ${validationErr.details.map((detail) => detail.message)}`;
    status = 400;
  }

  if(!status){
    status = 500;
  }

  if(status === 500){
    err.message = 'Internal Server Error';
  }

  return  res.status(status).json({ error: message });
};
