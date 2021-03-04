import { validationResult } from 'express-validator';
import { getProvider } from '../providers/factory';
import { create } from '../services/dashboardService';
import { handleControllerError } from '../errors/errors';

const getProjects = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array()
      });

      return next();
    }

    const type = req.header('x-provider');
    const user = req.header('x-user');
    const token = req.header('x-token');
    const url = req.header('x-base-url');

    const provider = getProvider(type);
    const result = await provider.getProjects(user, token, url);

    res.status(200).send(result);
  } catch (e) {
    console.error(e);
    res.status(500).send({
      message:
        'Error while processing the request. See the logs for more information.'
    });
  }

  return next();
};

const setup = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array()
      });

      return next();
    }

    const dashboard = await create(req.body, req.userId);

    if (dashboard.error) {
      return handleControllerError(res, dashboard.error);
    }

    res.status(200).send(dashboard.data);
  } catch (e) {
    console.error(e);
    res.status(500).send({
      message:
        'Error while processing the request. See the logs for more information.'
    });
  }

  return next();
};

export { setup, getProjects };
