import * as BaseRepository from './baseRepository';

const create = async (
  url,
  login,
  apiToken,
  projectId,
  boardId,
  name,
  userId,
  provider
) => {
  const query = `
    insert into dashboards (login, api_token, name, provider, base_url, user_id, project_id, board_id)
    values ($1, $2, $3, $4, $5, $6, $7, $8)
    returning id`;

  const dashboardId = await BaseRepository.insertReturningId(query, [
    login,
    apiToken,
    name,
    provider,
    url,
    userId,
    projectId,
    boardId
  ]);

  return dashboardId;
};

const get = async id => {
  const queryStr = 'select * from dashboards where id = $1;';
  const result = await BaseRepository.get(queryStr, [id]);

  return result.length ? result[0] : null;
};

const getByUser = async userId => {
  const queryStr =
    'select * from dashboards where user_id = $1 and active = true;';
  const result = await BaseRepository.get(queryStr, [userId]);

  return result.length ? result[0] : null;
};

const getByProjectAndBoard = async (projectKey, boardId) => {
  const queryStr = `
    select
      d.*,
      p.name as project_name,
      p.key as project_key,
      p.org as project_org,
      b.name as board_name,
      b.type as board_type
    from dashboards d
    inner join projects p on p.id = d.project_id
    inner join boards b on b.id = d.board_id
    where p.project_key = $1 and d.board_id = $2;`;

  const result = await BaseRepository.get(queryStr, [projectKey, boardId]);

  return result.length ? result[0] : null;
};

const getById = async id => {
  const queryStr = `
    select
      d.*,
      p.name as project_name,
      p.key as project_key,
      p.org as project_org,
      b.name as board_name,
      b.type as board_type
    from dashboards d
    inner join projects p on p.id = d.project_id
    inner join boards b on b.id = d.board_id
    where d.id = $1`;

  const result = await BaseRepository.get(queryStr, [id]);

  return result.length ? result[0] : null;
};

export { create, get, getByUser, getByProjectAndBoard, getById };
