import format from 'pg-format';
import pool from './pool';

const createBase = async (data, query, dataMapping) => {
  const dataList = Array.isArray(data) ? data : [data];
  const mappedData = dataList.map(x => dataMapping(x));
  const mappedQuery = format(query, mappedData);

  if (dataList.length) {
    await pool.query(mappedQuery);
  }
};

export default { createBase };
