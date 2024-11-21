import { Response, Request, NextFunction } from "express";
import joi from "joi";
import { Schema } from 'joi';

const { ValidationError } = joi;

export default (schema: Schema,reqProperty: keyof Request) => async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  try {
    await schema.validateAsync(req[reqProperty]);
    next();
  } catch(err) {
    next(err instanceof ValidationError);
  }
};
