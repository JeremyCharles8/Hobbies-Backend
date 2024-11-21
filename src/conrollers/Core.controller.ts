import { Request, Response } from 'express';

import { IService } from '../types/service.type.ts';
//? Error here or in services?
// import ApiError from '../errors/Api.error';

export default class CoreController<R, I, J> {
  //TODO Manage any types on IService
  service: IService<R, I, J, any>;
  static entityName: string | null = null;

  constructor(service: IService<R, I, J, any>) {
    this.service = service;
  };

  // async getAll(_: Request, res: Response): Promise<Response<R[]>> {
  //   const data = await this.service.getAll();

  //   return res.status(200).json(data);
  // }

  // async getOne(req: Request<{id: string}>, res: Response): Promise<Response<R>> {
  //   const id = parseInt(req.params.id, 10);
  //   const data = await this.service.getOne(id);
  //   //? Manage error here or in services ?
  //   // if(!data){
  //   //   return next(new ApiError(`${className.entityName} not found`, 404));
  //   // }

  //   return res.status(200).json(data);
  // }
  
  /**
   * Call the appropriate service with new entity informations to create this one
   * @param {Request<{I}>} req - Contains informations about entity that has to be created
   * @param {Response} res - Response object
   * @returns {Promise<{Response}>} 201 - e.g: User created successfully
   */
  async create(req: Request<{}, {}, I>, res: Response): Promise<Response> {
    const className = this.constructor as typeof CoreController;
    const input = req.body;
    await this.service.create(input);

    return res.status(201).json({ message: `${className.entityName} created successfully` });
  }
  
  // async update(req: Request<{id: string}, {}, J>, res: Response): Promise<Response<R>> {
  //   const id = parseInt(req.params.id, 10);
  //   const input = req.body;
  //   const updatedData = await this.service.update(id, input);
  //   //? Manage error here or in services ?
  //   // if(!updatedData){
  //   //   return next(new ApiError(`${className.entityName} not found`, 404));
  //   // }

  //   return res.status(200).json(updatedData);
  // }
  
  // async delete(req: Request, res: Response): Promise<Response> {
  //   const id = parseInt(req.params.id, 10);
  //   await this.service.delete(id);

  //   return res.status(204);
  // }
};
