import CoreDatamapper from './Core.datamapper';

import { CreateComic, IComic } from '../types/comic.type';

export default class UserDatamapper extends CoreDatamapper<IComic, CreateComic> {
  static tableName: string = 'comic';
};
