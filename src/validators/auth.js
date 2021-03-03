import { body } from 'express-validator';
import { errorMessages } from '../errors/errors';

const authValidator = [
  body('grantType')
    .notEmpty()
    .withMessage(errorMessages.validators.required),
  body('password').custom((value, { req }) => {
    if (req.body.grantType === 'password' && value == null) {
      throw new Error(errorMessages.validators.required);
    } else {
      return true;
    }
  }),
  body('email').custom((value, { req }) => {
    if (req.body.grantType === 'password' && value == null) {
      throw new Error(errorMessages.validators.required);
    } else {
      return true;
    }
  }),
  body('token').custom((value, { req }) => {
    if (req.body.grantType === 'refresh_token' && value == null) {
      throw new Error(errorMessages.validators.required);
    } else {
      return true;
    }
  })
];

export { authValidator };
