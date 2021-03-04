import { header, body } from 'express-validator';
import { errorMessages } from '../errors/errors';
import Providers from '../enums/providers';

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

const createDashboardValidator = [
  body('provider')
    .notEmpty()
    .withMessage(errorMessages.validators.required),
  body('login').custom((value, { req }) => {
    if (req.body.provider === Providers.Jira && value == null) {
      throw new Error(errorMessages.validators.required);
    } else {
      return true;
    }
  }),
  body('apiToken')
    .notEmpty()
    .withMessage(errorMessages.validators.required),
  body('baseUrl')
    .notEmpty()
    .withMessage(errorMessages.validators.required),
  body('projectKey')
    .notEmpty()
    .withMessage(errorMessages.validators.required),
  body('boardId')
    .notEmpty()
    .withMessage(errorMessages.validators.required),
  body('alias')
    .notEmpty()
    .withMessage(errorMessages.validators.required)
];

export { getProjectsValidator, createDashboardValidator };
