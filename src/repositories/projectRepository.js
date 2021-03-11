import * as BaseRepository from './baseRepository';

const create = async ({ id, name, key, org }) => {
  console.log(org);

  const query = `
    insert into projects (original_id, name, key, org)
    values ($1, $2, $3, $4)
    on conflict (original_id, org) do update set name=EXCLUDED.name returning id`;

  const projectId = await BaseRepository.insertReturningId(query, [
    id,
    name,
    key,
    org
  ]);

  return projectId;
};

const getByKey = async key => {
  const query = 'select * from projects where key = $1';
  const result = await BaseRepository.get(query, [key]);

  return result.length ? result[0] : null;
};

export { create, getByKey };
