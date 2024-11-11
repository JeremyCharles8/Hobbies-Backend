import CoreDatamapper from './Core.datamapper';

import { CreateUser, FindOneColumn, IUser, LoginUser } from '../types/user.type';
import { QueryResult } from 'pg';

export default class UserDatamapper extends CoreDatamapper<IUser, CreateUser> {
  static tableName: string = 'user';

  async findOne<T extends FindOneColumn>(column: T, input: string): Promise<T extends 'email' ? LoginUser | null : boolean> {
    // Request to database
    const results: QueryResult<{result: LoginUser | boolean}> = await this.client.query(`
      SELECT select_user_by_${column}($1::text) as result;`,
    [input],
    );

    if(results.rows.length === 0 && column === 'email'){
      return null as T extends 'email' ? LoginUser | null : boolean;
    }
    // Return data
    return results.rows[0].result as T extends 'email' ? LoginUser | null : boolean;
  }
};
