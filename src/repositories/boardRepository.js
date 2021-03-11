import * as BaseRepository from './baseRepository';

const create = async ({ id, name, type, projectId }) => {
  const query = `
    insert into boards (original_id, name, type, project_id)
    values ($1, $2, $3, $4)
    on conflict (original_id, project_id) do update set name=EXCLUDED.name returning id`;

  const boardId = await BaseRepository.insertReturningId(query, [
    id,
    name,
    type,
    projectId
  ]);

  return boardId;
};

const getById = async id => {
  const query = 'select * from boards where id = $1';
  const result = await BaseRepository.get(query, [key]);

  return result.length ? result[0] : null;
};

export { create, getById };
