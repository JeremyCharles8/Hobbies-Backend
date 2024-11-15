import { Request, Response, NextFunction, RequestHandler } from "express";

type RequestHandlerWithRes = (req: Request, res: Response, next: NextFunction)=> Promise<Response>;
export default (controller: RequestHandlerWithRes) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await controller(req, res, next);
  } catch(error) {
    next(error);
  }
};
