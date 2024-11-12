import { NextFunction, Request, Response } from 'express';

import { IService } from '../types/service.type';
//? Error here or in services?
// import ApiError from '../errors/Api.error';

export default class CoreController<R, I, J> {
  //TODO Manage any types on IService
  static service: IService<any, any, any, any>;
  static entityName: string | null = null;

  constructeur() {};

  async getAll(_: Request, res: Response): Promise<Response<R[]>> {
    const className = this.constructor as typeof CoreController;
    const data: R[] = await className.service.findAll();

    return res.status(200).json(data);
  }

  async getOne<R>(req: Request, res: Response, next: NextFunction): Promise<Response<R>> {
    const className = this.constructor as typeof CoreController;
    const id = parseInt(req.params.id, 10);
    const data: R = await className.service.findByPk(id);
    //? Manage error here or in services ?
    // if(!data){
    //   return next(new ApiError(`${className.entityName} not found`, 404));
    // }

    return res.status(200).json(data);
  }
  
  async create(req: Request<{}, {}, I>, res: Response): Promise<Response> {
    const className = this.constructor as typeof CoreController;
    const input = req.body;
    await className.service.create(input);

    return res.status(201).json({ message: `${className.entityName} created successfully` });
  }
  
  async update(req: Request<{id: string}, {}, J>, res: Response, next: NextFunction): Promise<Response<R>> {
    const className = this.constructor as typeof CoreController;
    const id = parseInt(req.params.id, 10);
    const input = req.body;
    const updatedData: R = await className.service.update(id, input);
    //? Manage error here or in services ?
    // if(!updatedData){
    //   return next(new ApiError(`${className.entityName} not found`, 404));
    // }

    return res.status(200).json(updatedData);
  }
  
  async delete(req: Request, res: Response): Promise<Response> {
    const className = this.constructor as typeof CoreController;
    const id = parseInt(req.params.id, 10);
    await className.service.delete(id);

    return res.status(204);
  }
};
