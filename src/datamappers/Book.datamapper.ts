import CoreDatamapper from './Core.datamapper.ts';

import { CreateBook, IBook } from '../types/book.type.ts';

export default class UserDatamapper extends CoreDatamapper<IBook, CreateBook, void> {
  static tableName: string = 'book';
};
