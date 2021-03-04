import * as BaseRepository from './baseRepository';

const create = async (email, password) => {
  const query =
    'insert into users (email, password) values ($1, $2) returning id';
  const userId = await BaseRepository.insertReturningId(query, [
    email,
    password
  ]);

  return userId;
};

const get = async id => {
  const queryStr = 'select * from users where id = $1;';
  const result = await BaseRepository.get(queryStr, [id]);

  return result.length ? result[0] : null;
};

const getByEmail = async email => {
  const queryStr = 'select * from users where email = $1;';
  const result = await BaseRepository.get(queryStr, [email]);

  return result.length ? result[0] : null;
};

const getByEmailAndPassword = async (email, password) => {
  const queryStr = 'select * from users where email = $1 and password = $2;';
  const result = await BaseRepository.get(queryStr, [email, password]);

  return result.length ? result[0] : null;
};

export { create, get, getByEmail, getByEmailAndPassword };
