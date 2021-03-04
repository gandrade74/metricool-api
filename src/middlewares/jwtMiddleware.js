import jwt from 'jsonwebtoken';
import fs from 'fs';
import config from '../config';

const publicKey = fs.readFileSync(`${__dirname}/public.key`, 'utf8');

const verifyJwt = (req, res, next) => {
  let token = req.header('Authorization');

  if (!token)
    return res.status(401).json({ auth: false, message: 'Unauthorized' });

  token = token.replace('Bearer ', '');

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

  return jwt.verify(token, publicKey, verifyOptions, (err, decoded) => {
    if (err)
      return res
        .status(401)
        .json({ auth: false, message: 'Failed to authenticate token.' });

    req.userId = decoded.id;

    return next();
  });
};

export { verifyJwt };
