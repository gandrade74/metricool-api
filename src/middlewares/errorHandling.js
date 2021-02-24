import { errorMessages } from '../errors/errors';

const syntaxError = (error, req, res, next) => {
  console.log(error);
  if (error instanceof SyntaxError) {
    return res.status(400).send({ messages: [errorMessages.requestBadFormat] });
  }

  return next();
};

export default { syntaxError };
