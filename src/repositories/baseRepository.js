import format from 'pg-format';
import pool from './pool';

const execute = async (query, params) => {
  try {
    const result = await pool.query(query, params);
    return result.rows;
  } catch (e) {
    console.log(query);
    console.error(e);
    throw e;
  }
};

const insert = async (query, params) => {
  await execute(query, params);
};

const insertReturningId = async (query, params) => {
  return execute(query, params);
};

const insertMany = async (query, data, map) => {
  const dataList = Array.isArray(data) ? data : [data];
  const mappedData = dataList.map(x => map(x));
  const mappedQuery = format(query, mappedData);

  if (dataList.length) {
    await execute(mappedQuery);
  }
};

const get = async (query, params) => {
  return execute(query, params);
};

export { insert, insertMany, insertReturningId, get };
