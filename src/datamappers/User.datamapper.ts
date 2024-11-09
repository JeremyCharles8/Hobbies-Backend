import CoreDatamapper from './Core.datamapper';

import { CreateUser, IUser, LoginUser } from '../types/user.type';
import { QueryResult } from 'pg';

export default class UserDatamapper extends CoreDatamapper<IUser, CreateUser> {
  static tableName: string = 'user';

  async findOne(column: string, input: string): Promise<LoginUser | boolean | null> {
    // Request to database
    const results: QueryResult<{result: LoginUser | boolean}> = await this.client.query(`
      SELECT select_user_by_${column}($1::text) as result;`,
    [input],
    );

    if(results.rows.length === 0){
      return null;
    }
    // Return data
    return results.rows[0].result;
  }
};
