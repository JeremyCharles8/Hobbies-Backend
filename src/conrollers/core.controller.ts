import { Request, Response, NextFunction } from 'express';
import ApiError from '../errors/Api.error';

export default class CoreController<T> {
  static datamapper: IDatamapper<T> | null = null;
  static entityName: string | null = null;

  static async getall(_: Request, res: Response): Promise<Response<T[]>> {
    const data = await this.datamapper.findAll();
    return res.json(data);
  }
};
