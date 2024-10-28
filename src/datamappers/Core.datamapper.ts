import { Pool } from "pg";

export default class CoreDatamapper {
  static tableName: string | null = null;
  protected client: Pool;

  constructor(client: Pool) {
    this.client = client;
  }

  async create (input, id: number | void) {
    if(this.constructor.tableName === 'user') {
      await this.client.query(
        'SELECT insert_user($1::json);',
        [input],
      );
    } else {
      await this.client.query(
        `SELECT insert_${this.constructor.tableName}($1::int, $2::json);`,
        [id, input],
      );
    }
  }
}