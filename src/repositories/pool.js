import pg from 'pg';
import pgCamelCase from 'pg-camelcase';
import config from '../config';

pgCamelCase.inject(pg);

const pool = new pg.Pool({
  user: config.postgres.user,
  host: config.postgres.host,
  database: config.postgres.database,
  password: config.postgres.password,
  port: config.postgres.port,
  ssl: { rejectUnauthorized: false }
});

export default pool;
