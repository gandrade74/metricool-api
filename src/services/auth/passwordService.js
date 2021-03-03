import * as crypto from 'crypto';
import config from '../../config';
import CustomError from '../../errors/customError';
import { errorTypes, errorMessages } from '../../errors/errors';
import AuthResult from './authResult';
import * as UserService from '../userService';

const authenticateByPassword = async (email, password) => {
  const hashedPwd = crypto
    .createHmac('sha256', config.auth.passwordSalt)
    .update(password)
    .digest('hex');

  let result = null;
  const user = await UserService.getByEmailAndPassword(email, hashedPwd);

  if (!user) {
    const error = new CustomError(
      errorTypes.Validation,
      errorMessages.users.incorretEmailOrPassword
    );

    result = new AuthResult(null, error);
    return result;
  }
  result = new AuthResult({ id: user.id, email: user.email });
  return result;
};

export { authenticateByPassword };
