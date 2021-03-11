import { validationResult } from 'express-validator';
import { getProvider } from '../providers/factory';
import * as DashboardService from '../services/dashboardService';
import {
  errorTypes,
  handleControllerError,
  handleControllerUnexpectedError
} from '../errors/errors';
import CustomError from '../errors/customError';

const getProjects = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new CustomError(errorTypes.Validation, errors.array());
      return handleControllerError(res, error);
    }

    const type = req.header('x-provider');
    const user = req.header('x-user');
    const token = req.header('x-token');
    const url = req.header('x-base-url');
    const provider = getProvider(type);
    const result = await provider.getProjects(user, token, url);

    return res.status(200).send(result);
  } catch (e) {
    return handleControllerUnexpectedError(res, e);
  }
};

const getProjectDetails = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new CustomError(errorTypes.Validation, errors.array());
      return handleControllerError(res, error);
    }

    const type = req.header('x-provider');
    const user = req.header('x-user');
    const token = req.header('x-token');
    const url = req.header('x-base-url');
    const { projectKey } = req.params;
    const provider = getProvider(type);
    const result = await provider.getProjectDetails(
      user,
      token,
      url,
      projectKey
    );

    return res.status(200).send(result);
  } catch (e) {
    return handleControllerUnexpectedError(res, e);
  }
};

const setup = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new CustomError(errorTypes.Validation, errors.array());
      return handleControllerError(res, error);
    }

    const dashboard = await DashboardService.create(req.body, req.userId);

    if (dashboard.error) {
      return handleControllerError(res, dashboard.error);
    }

    return res.status(200).send(dashboard.data);
  } catch (e) {
    return handleControllerUnexpectedError(res, e);
  }
};

const sync = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new CustomError(errorTypes.Validation, errors.array());
      return handleControllerError(res, error);
    }

    console.log(req.params.dashboardId);

    const dashboard = await DashboardService.sync(
      req.params.dashboardId,
      req.userId
    );

    if (dashboard.error) {
      return handleControllerError(res, dashboard.error);
    }

    return res.status(200).send(dashboard.data);
  } catch (e) {
    return handleControllerUnexpectedError(res, e);
  }
};

export { getProjects, getProjectDetails, setup, sync };
