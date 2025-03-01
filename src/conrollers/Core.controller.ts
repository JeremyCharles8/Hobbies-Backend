import { Request, Response } from 'express';

import { IService } from '../types/service.type.ts';

export default class CoreController<R, I, J> {
  service: IService<R, I, J, any>;
  static entityName: string | null = null;

  constructor(service: IService<R, I, J, any>) {
    this.service = service;
  }

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
   * Generic method that call appropriate service to get one entity's row
   * @param {Request} req Contain entity id in params or user
   * @param {Response} res
   * @returns {Promise<Response<R>>} 200 - return selected entity's row
   */
  async getOne(req: Request, res: Response): Promise<Response<R>> {
    const className = this.constructor as typeof CoreController;
    if (className.entityName === 'user') {
      const { id } = (req as Request & { user: { id: number } }).user;
      const entity = await this.service.getOne(id);

      return res.status(200).json(entity);
    }

    const id = parseInt(req.params.id, 10);
    const entity = await this.service.getOne(id);

    return res.status(200).json(entity);
  }

  /**
   * Call the appropriate service with new entity informations to create this one
   * @param {Request<I>} req - Contains informations about entity that has to be created
   * @param {Response} res
   * @returns {Promise<Response>} 201 - e.g: User created successfully
   */
  async create(req: Request<{}, {}, I>, res: Response): Promise<Response> {
    const className = this.constructor as typeof CoreController;
    const input = req.body;
    await this.service.create(input);

    return res
      .status(201)
      .json({ message: `${className.entityName} created successfully` });
  }

  /**
   * Generic method that update information(s) for an entity's row in database
   * @param {Request<J>} req.body - Contains information(s) that has to be change for an entity's row
   * @param {Response} res
   * @returns {Promise<Response<R>>} 200 - return entity with updated information(s)
   */
  async update(
    req: Request<{ id?: string }, {}, J>,
    res: Response,
  ): Promise<Response<R>> {
    const userId = (req as Request<{ id: string }> & { user: { id: number } })
      .user.id;
    if (req.params.id) {
      const id = parseInt(req.params.id, 10);
      const input = req.body;

      const updatedData = await this.service.update(userId, input, id);

      return res.status(200).json(updatedData);
    }

    const input = req.body;
    const updatedData = await this.service.update(userId, input);

    return res.status(200).json(updatedData);
  }

  /**
   * Get user's id in request and delete service
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<Response>} 204 for request done but nothing to return
   */
  async delete(req: Request, res: Response): Promise<Response> {
    const userId = (req as Request & { user: { id: number } }).user.id;
    if (req.params.id) {
      const id = parseInt(req.params.id, 10);
      await this.service.delete(userId, id);

      return res.status(204);
    }

    await this.service.delete(userId);

    return res.status(204);
  }
}
