import { Request, Response } from 'express';
import extApiService from '../services/extApi.service.ts';

import { BookComicChoices } from '../types/extApi.type.ts';

export default class ExtApiController {
  /**
   * Get user input in request body and call getBookComic service with it
   * @param {Request<string>} req.body - Contain item title
   * @param {Response} res
   * @returns {Promise<Response<BookComicChoices>>} 200 - A list of items corresponding to title input
   */
  static async getBookComicList(
    req: Request<{}, {}, { title: string }>,
    res: Response,
  ): Promise<Response<BookComicChoices>> {
    const { title } = req.body;
    const itemsList = await extApiService.getBookComic(title);

    return res.status(200).json(itemsList);
  }
}
