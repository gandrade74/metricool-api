import * as BaseRepository from './baseRepository';

const create = async (
  url,
  login,
  apiToken,
  projectId,
  projectKey,
  projectName,
  boardId,
  boardName,
  boardType,
  alias,
  userId,
  provider
) => {
  const query = `
    insert into dashboards (url, login, api_token,
    project_id, project_key, project_name, board_id, board_name, board_type, alias, user_id, provider)
    values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    returning id`;

  const dashboardId = await BaseRepository.insertReturningId(query, [
    url,
    login,
    apiToken,
    projectId,
    projectKey,
    projectName,
    boardId,
    boardName,
    boardType,
    alias,
    userId,
    provider
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
  const queryStr =
    'select * from dashboards where project_key = $1 and board_id = $2;';
  const result = await BaseRepository.get(queryStr, [projectKey, boardId]);

  return result.length ? result[0] : null;
};

export { create, get, getByUser, getByProjectAndBoard };
