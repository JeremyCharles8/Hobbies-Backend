import pg from 'pg';

const { Pool } = pg;

const client = new Pool({connectionString: process.env.PGURL});

export default client;
