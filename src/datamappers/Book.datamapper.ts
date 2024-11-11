import CoreDatamapper from './Core.datamapper';

import { CreateBook, IBook } from '../types/book.type';

export default class UserDatamapper extends CoreDatamapper<IBook, CreateBook> {
  static tableName: string = 'book';
};
