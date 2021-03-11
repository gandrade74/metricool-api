import * as BaseRepository from './baseRepository';

const create = async (data, projectId) => {
  const map = x => [x.id, x.name, x.description, x.hierarchyLevel, projectId];
  const query = `
    insert into project_work_types (original_id, name, description, hierarchy_level, project_id)
    values %L
    on conflict do nothing`;

  await BaseRepository.insertMany(query, data, map);
};

const getByProjectId = async projectId => {
  const query = 'select * from project_work_types where project_id = $1';
  const result = await BaseRepository.get(query, [projectId]);

  return result;
};

export { create, getByProjectId };
