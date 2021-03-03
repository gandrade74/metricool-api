import { body } from 'express-validator';
import { errorMessages } from '../errors/errors';

const createUserValidator = [
  body('email')
    .notEmpty()
    .withMessage(errorMessages.validators.required)
    .isEmail(),
  body('password')
    .notEmpty()
    .withMessage(errorMessages.validators.required)
];

export { createUserValidator };
