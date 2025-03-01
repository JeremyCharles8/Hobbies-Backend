import { Pool, QueryResult, QueryResultRow } from 'pg';

export default class CoreDatamapper<R extends QueryResultRow, I, J> {
  static tableName: string | null = null;
  protected client: Pool;

  constructor(client: Pool) {
    this.client = client;
  }

  async findAll(): Promise<R[]> {
    const className = this.constructor as typeof CoreDatamapper;
    // Request to database
    const results: QueryResult<R> = await this.client.query(
      `SELECT * FROM ${className.tableName};`,
    );
    // Return data
    return results.rows;
  }

  /**
   * Generic method which looks specific line in database using id
   * @param {number} id - Entity id
   * @returns {Promise<R>}
   */
  async findByPk(id: number): Promise<R | null> {
    const className = this.constructor as typeof CoreDatamapper;
    // Request to database
    const results: QueryResult<{ result: R }> = await this.client.query(
      `SELECT select_${className.tableName}_by_pk($1::int) as result;`,
      [id],
    );
    if (results.rows.length === 0) {
      return null;
    }
    // Return data
    console.log(results.rows[0].result);

    return results.rows[0].result;
  }

  /**
   * Generic method which adds an entity's row in database
   * @param {I} input - Object which contains new entity's informations
   * @param {number | void} id - User id used if which is added is not an user
   * @returns {Promise<void>}
   */
  async create(input: I, id: number | void): Promise<void> {
    const className = this.constructor as typeof CoreDatamapper;
    // Request to database
    if (className.tableName === 'user') {
      await this.client.query('SELECT insert_user($1::json);', [input]);
    } else {
      await this.client.query(
        `SELECT insert_${className.tableName}($1::int, $2::json);`,
        [id, input],
      );
    }
  }

  async update(id: number, input: J): Promise<R> {
    const className = this.constructor as typeof CoreDatamapper;
    //Request to database
    const results: QueryResult<R> = await this.client.query(
      `SELECT update_${className.tableName}($1::int, $2::json) as result;`,
      [id, input],
    );
    // Return data
    return results.rows[0].result;
  }

  /**
   * Genreic method which deletes entity's row in database
   * @param {number} id - Entity's id
   * @returns {Promise<{boolean}>}
   */
  async delete(id: number): Promise<boolean> {
    const className = this.constructor as typeof CoreDatamapper;
    // Request to database
    const result = await this.client.query(
      `DELETE FROM "${className.tableName}" WHERE "id" = $1::int;`,
      [id],
    );
    // Return data
    return !!result.rowCount;
  }
}
