import { Pool } from 'pg';

const client = new Pool({connectionString: process.env.PGURL});

export default client;
