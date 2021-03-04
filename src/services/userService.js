import * as crypto from 'crypto';
import { errorMessages, errorTypes } from '../errors/errors';
import CustomError from '../errors/customError';
import ServiceResponse from './serviceResponse';
import config from '../config';
import * as UserRepository from '../repositories/userRepository';

const create = async data => {
  const { email, password } = data;
  const hashedPwd = crypto
    .createHmac('sha256', config.auth.passwordSalt)
    .update(password)
    .digest('hex');

  const userData = {
    email,
    password: hashedPwd,
    socialProviders: []
  };

  const user = await UserRepository.getByEmail(email);
  const response = new ServiceResponse();

  if (user) {
    response.error = new CustomError(
      errorTypes.Conflict,
      errorMessages.users.alreadyExists
    );
    return response;
  }

  const id = await UserRepository.create(userData.email, userData.password);

  response.data = { id, email };

  return response;
};

const getByEmailAndPassword = (email, password) => {
  return UserRepository.getByEmailAndPassword(email, password);
};

export { create, getByEmailAndPassword };
