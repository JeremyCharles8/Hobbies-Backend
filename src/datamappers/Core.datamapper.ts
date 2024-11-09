import { Pool, QueryResult, QueryResultRow } from "pg";

export default class CoreDatamapper<R extends QueryResultRow, I> {
  static tableName: string | null = null;
  protected client: Pool;

  constructor(client: Pool) {
    this.client = client;
  }

  async findAll(): Promise<R[]> {
    const className = this.constructor as typeof CoreDatamapper;
    // Request to database
    const results: QueryResult<R> = await this.client.query(
      `SELECT * FROM ${className.tableName};`
    );
    // Return data
    return results.rows;
  }

  async findByPk(id: number): Promise<R | null> {
    const className = this.constructor as typeof CoreDatamapper;
    // Request to database
    const results: QueryResult<{result: R}> = await this.client.query(
      `SELECT select_${className.tableName}_by_pk($1::int) as result;`,
      [id]
    )
    if(results.rows.length === 0){
      return null;
    }
    // Return data
    return results.rows[0].result;
  }

  async create(input: I, id: number | void): Promise<void> {
    const className = this.constructor as typeof CoreDatamapper;
    // Request to database
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

  async update(id: number, input: I): Promise<R> {
    const className = this.constructor as typeof CoreDatamapper;
    //Request to database
    const results: QueryResult<R> = await this.client.query(
      `SELECT update_${className.tableName}($1::int, $2::json) as result;`,
      [id, input]
    );
    // Return data
    return results.rows[0].result;
  }

  async delete(id: number): Promise<void> {
    const className = this.constructor as typeof CoreDatamapper;
    // Request to database
    await this.client.query(
      `SELECT delete_${className.tableName}($1::int);`,
    [id]
    );
  }
};
