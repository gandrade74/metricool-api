import { errorMessages, errorTypes } from '../errors/errors';
import CustomError from '../errors/customError';
import ServiceResponse from './serviceResponse';
import { getProvider } from '../providers/factory';
import * as DashboardRepository from '../repositories/dashboardRepository';

const create = async (data, userId) => {
  let dashboard = await DashboardRepository.getByProjectAndBoard(
    data.projectKey,
    data.boardId
  );
  const response = new ServiceResponse();

  if (dashboard && dashboard.userId === userId) {
    response.error = new CustomError(
      errorTypes.Conflict,
      errorMessages.dashboards.alreadyExists
    );
    return response;
  }

  const {
    provider,
    login,
    apiToken,
    baseUrl,
    projectKey,
    boardId,
    alias
  } = data;

  const providerInstance = getProvider(provider);
  const project = await providerInstance.getProject(
    login,
    apiToken,
    baseUrl,
    projectKey
  );

  if (!project) {
    response.error = new CustomError(
      errorTypes.Conflict,
      errorMessages.dashboards.projectNotExists
    );
    return response;
  }

  const board = project.boards.find(x => x.id === boardId);

  if (!board) {
    response.error = new CustomError(
      errorTypes.Conflict,
      errorMessages.dashboards.boardDoesNotBelongsToProject
    );
    return response;
  }

  dashboard = await DashboardRepository.create(
    baseUrl,
    login,
    apiToken,
    project.id,
    project.key,
    project.name,
    board.id,
    board.name,
    board.type,
    alias,
    userId,
    provider
  );

  response.data = dashboard;

  return response;
};

const getById = id => {
  return DashboardRepository.get(id);
};

const getByUser = userId => {
  return DashboardRepository.get(userId);
};

export { create, getById, getByUser };
