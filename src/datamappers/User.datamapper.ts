import CoreDatamapper from './Core.datamapper';

export default class UserDatamapper extends CoreDatamapper {
  static tableName: string = 'user';

  async findOne(column: string, input: string) {
    //TODO Check for data type and format
    const data = await this.client.query(`
      SELECT select_user_by_${column}($1::text);`,
    [input],
    );
    return data;
  }
};
