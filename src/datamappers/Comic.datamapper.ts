import CoreDatamapper from './Core.datamapper.ts';

import { CreateComic, IComic } from '../types/comic.type.ts';

export default class UserDatamapper extends CoreDatamapper<IComic, CreateComic, void> {
  static tableName: string = 'comic';
};
