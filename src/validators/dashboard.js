import { header } from 'express-validator';
import { errorMessages } from '../errors/errors';

const getProjectsValidator = [
  header('x-provider')
    .notEmpty()
    .withMessage(errorMessages.validators.required),
  header('x-user')
    .notEmpty()
    .withMessage(errorMessages.validators.required),
  header('x-token')
    .notEmpty()
    .withMessage(errorMessages.validators.required),
  header('x-base-url')
    .notEmpty()
    .withMessage(errorMessages.validators.required)
];

export { getProjectsValidator };
