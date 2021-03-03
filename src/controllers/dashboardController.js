import { validationResult } from 'express-validator';
import { getProvider } from '../providers/factory';

const getProjectsBoards = async (req, res, next) => {
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
    const result = await provider.getProjectsBoards(user, token, url);

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

    res.status(200).send();
  } catch (e) {
    console.error(e);
    res.status(500).send({
      message:
        'Error while processing the request. See the logs for more information.'
    });
  }

  return next();
};

export { getProjectsBoards, setup };
