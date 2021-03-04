import CustomError from './customError';

export const errorMessages = {
  genericError: 'Error while processing the request',
  genericDbError: 'Database error',
  requestBadFormat: 'Bad format for request',
  validators: {
    required: 'Required field'
  },
  users: {
    alreadyExists: 'A user already exists with the email informed'
  },
  auth: {
    invalidGrantType: 'Invalid grant type',
    invalidRefreshToken: 'Invalid refresh token'
  },
  dashboards: {
    alreadyExists:
      'Another dashboard for the same project and board is already configured for the user',
    projectNotExists: 'Project not exists',
    boardDoesNotBelongsToProject: 'Board does not belongs to project'
  }
};

export const errorTypes = Object.freeze({
  Conflict: 'conflict',
  Unexpected: 'unexpected',
  Validation: 'validation',
  NotFound: 'notFound'
});

const mapError = error => ({
  id: error.id,
  messages: error.messages
});

export const handleControllerError = (res, error) => {
  if (error.type === errorTypes.Conflict) {
    return res.status(409).json({ messages: error.messages });
  }

  if (error.type === errorTypes.Validation) {
    return res.status(400).json({ messages: error.messages });
  }

  if (error.type === errorTypes.NotFound) {
    return res.status(404).json({ messages: error.messages });
  }

  return res.status(500).json(mapError(error));
};

export const handleControllerUnexpectedError = (res, exception) => {
  const error = new CustomError(
    errorTypes.Unexpected,
    errorMessages.genericError,
    exception
  );

  error.log();

  return handleControllerError(res, error);
};
