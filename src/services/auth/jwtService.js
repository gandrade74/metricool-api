import jwt from 'jsonwebtoken';
import fs from 'fs';
import config from '../../config';

const privateKey = fs.readFileSync(`${__dirname}/private.key`, 'utf8');
const publicKey = fs.readFileSync(`${__dirname}/public.key`, 'utf8');

const generateToken = async (req, res, user) => {
  const payload = {
    email: user.email
  };

  const signOptions = {
    issuer: config.auth.jwt.issuer,
    subject: user.email,
    audience: req
      .get('host')
      .split(':')
      .shift(),
    expiresIn: config.auth.jwt.expiration,
    algorithm: config.auth.jwt.algorithm
  };

  const token = jwt.sign(payload, privateKey, signOptions);
  const authResult = { user: payload, token };

  return res.status(200).json(authResult);
};

const validateToken = async (req, res, token) => {
  const verifyOptions = {
    issuer: config.auth.jwt.issuer,
    subject: req.headers.user,
    audience: req
      .get('host')
      .split(':')
      .shift(),
    expiresIn: config.auth.jwt.expiration,
    algorithm: [config.auth.jwt.algorithm]
  };

  try {
    return jwt.verify(token, publicKey, verifyOptions);
  } catch (err) {
    return false;
  }
};

const decode = token => {
  return jwt.decode(token, { complete: true });
};
export { generateToken, validateToken, decode };
