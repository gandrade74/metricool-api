import { validationResult } from 'express-validator';
import {
  errorTypes,
  errorMessages,
  handleControllerError,
  handleControllerUnexpectedError
} from '../errors/errors';
import CustomError from '../errors/customError';
import { authenticateByPassword } from '../services/auth/passwordService';
import { generateToken } from '../services/auth/jwtService';

const authenticate = async (req, res) => {
  try {
    let authResult = null;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new CustomError(errorTypes.Validation, errors.array());
      return handleControllerError(res, error);
    }

    switch (req.body.grantType) {
      case 'password':
        authResult = await authenticateByPassword(
          req.body.email,
          req.body.password
        );
        break;
      default: {
        const error = new CustomError(errorTypes.Validation, [
          errorMessages.auth.invalidGrantType
        ]);

        return handleControllerError(res, error);
      }
    }

    if (authResult.error) {
      return handleControllerError(res, authResult.error);
    }

    return generateToken(req, res, authResult.user);
  } catch (err) {
    return handleControllerUnexpectedError(res, err);
  }
};

export { authenticate };
