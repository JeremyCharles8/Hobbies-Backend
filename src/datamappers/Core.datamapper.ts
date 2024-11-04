import { Pool } from "pg";

export default class CoreDatamapper {
  static tableName: string | null = null;
  protected client: Pool;

  constructor(client: Pool) {
    this.client = client;
  }

  async create (input: object, id: number | void) {
    const className = this.constructor as typeof CoreDatamapper;
    if(className.tableName === 'user') {
      await this.client.query(
        'SELECT insert_user($1::json);',
        [input],
      );
    } else {
      await this.client.query(
        `SELECT insert_${className.tableName}($1::int, $2::json);`,
        [id, input],
      );
    }
  }
};
