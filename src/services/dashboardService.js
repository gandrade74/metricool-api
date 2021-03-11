import { errorMessages, errorTypes } from '../errors/errors';
import CustomError from '../errors/customError';
import ServiceResponse from './serviceResponse';
import Providers from '../enums/providers';
import { getProvider } from '../providers/factory';
import * as DashboardRepository from '../repositories/dashboardRepository';
import * as ProjectRepository from '../repositories/projectRepository';
import * as BoardRepository from '../repositories/boardRepository';
import * as WorkTypeRepository from '../repositories/workTypeRepository';

const getOrg = (provider, url) => {
  if (provider === Providers.Jira) {
    const regex = /(?:http[s]*:\/\/)*(.*?)\.(?=[^/]*\..{2,5})/i;
    const org = url.match(regex);

    return org[1];
  }

  return Providers.Github;
};

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
      errorTypes.NotFound,
      errorMessages.dashboards.boardDoesNotBelongsToProject
    );
    return response;
  }

  const projectOrg = getOrg(provider, baseUrl);

  const newProject = await ProjectRepository.create({
    ...project,
    org: projectOrg
  });
  const newBoard = await BoardRepository.create({
    ...board,
    projectId: newProject.id
  });

  dashboard = await DashboardRepository.create(
    baseUrl,
    login,
    apiToken,
    newProject.id,
    newBoard.id,
    alias,
    userId,
    provider
  );

  response.data = dashboard;

  return response;
};

const sync = async (dashboardId, userId) => {
  const dashboard = await DashboardRepository.getById(dashboardId);
  const response = new ServiceResponse();

  if (!dashboard) {
    response.error = new CustomError(
      errorTypes.NotFound,
      errorMessages.dashboards.notFound
    );
    return response;
  }

  if (dashboard.userId !== userId) {
    response.error = new CustomError(
      errorTypes.Forbidden,
      errorMessages.dashboards.dashboardDoesNotBelongsToUser
    );
    return response;
  }

  const { login, apiToken, baseUrl, projectKey } = dashboard;

  const providerInstance = getProvider(dashboard.provider);
  const projectDetails = await providerInstance.getProjectDetails(
    login,
    apiToken,
    baseUrl,
    projectKey
  );

  if (!projectDetails) {
    response.error = new CustomError(
      errorTypes.NotFound,
      errorMessages.dashboards.projectNotExists
    );
    return response;
  }

  console.log(projectDetails.issueTypes);

  await WorkTypeRepository.create(
    projectDetails.issueTypes,
    dashboard.projectId
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

export { create, sync, getById, getByUser };
