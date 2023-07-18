const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError'); // 401

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  // Там токен
  const { authorization } = req.headers;
  if (!authorization) return next(new UnauthorizedError('Необходима авторизация'));
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
