import { Pool } from 'pg';
import config from '../config';

const pool = new Pool({
  user: config.postgres.user,
  host: config.postgres.host,
  database: config.postgres.database,
  password: config.postgres.password,
  port: config.postgres.port,
  ssl: { rejectUnauthorized: false }
});

export default pool;
