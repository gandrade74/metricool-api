import { validationResult } from 'express-validator';
import * as Jira from '../providers/jira';

const getProjects = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array()
      });

      return next();
    }

    const token = req.header('Authorization');
    const baseUrl = req.header('Organization-Url');

    const result = await Jira.getProjects(token, baseUrl);
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

const createProject = async () => {};

export { getProjects };
