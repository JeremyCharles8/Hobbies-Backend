import { Request, Response } from 'express';

export default class CoreController<I, J, R > {
  //TODO service interface
  static service = null;
  static entityName: string | null = null;

  static async getAll(_: Request, res: Response): Promise<Response<R[]>> {
    const data = await this.service.findAll();

    return res.status(200).json(data);
  }

  static async getOne(req: Request, res: Response): Promise<Response<R>> {
    //TODO id and req.params type
    const id = req.params.id;
    const data = await this.service.findByPk(id);

    return res.status(200).json(data);
  }
  //TODO Promise type
  static async create(req: Request, res: Response): Promise<void> {
    const input: I = req.body;
    await this.service.create(input);

    return res.status(201).json({ message: `${this.entityName} created successfully` });
  }
  //TODO types
  static async update(req: Request, res: Response): Promise<R> {
    const input: J = req.body;
    const { id } = req.params;
    const updatedData: R = await this.service.update(id, input);

    return res.status(200).json(updatedData);
  }
  //TODO Promise type
  static async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await this.service.delete(id);

    return res.status(200).json({ message: `${this.entityName} deleted successfully`});
  }
};
