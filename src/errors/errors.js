import CustomError from './customError';

export const errorMessages = {
  genericError: 'Erro ao processar a requisição',
  genericDbError: 'Erro ao acessar à base de dados',
  requestBadFormat: 'A requisição está mal formatada'
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
