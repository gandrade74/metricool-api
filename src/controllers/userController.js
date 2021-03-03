import { validationResult } from 'express-validator';
import {
  errorTypes,
  handleControllerError,
  handleControllerUnexpectedError
} from '../errors/errors';
import CustomError from '../errors/customError';
import { create } from '../services/userService';

const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new CustomError(errorTypes.Validation, errors.array());
      return handleControllerError(res, error);
    }

    const user = await create(req.body);

    if (user.error) {
      return handleControllerError(res, user.error);
    }

    return res.status(201).send();
  } catch (err) {
    return handleControllerUnexpectedError(res, err);
  }
};

export { createUser };
