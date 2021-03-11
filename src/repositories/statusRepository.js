import * as BaseRepository from './baseRepository';

const create = async (data, projectId) => {
  const map = x => [x.id, x.name, x.description, x.categoryName, projectId];
  const query = `
    insert into project_statuses (original_id, name, description, category_name, project_id)
    values %L
    on conflict do nothing`;

  await BaseRepository.insertMany(query, data, map);
};

const getByProjectId = async projectId => {
  const query = 'select * from project_statuses where project_id = $1';
  const result = await BaseRepository.get(query, [projectId]);

  return result;
};

export { create, getByProjectId };
