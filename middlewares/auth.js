const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    return next(new AuthError('Необходима авторизация'));
  }
  let payload;
  try {
    payload = jwt.verify(req.cookies.jwt, 'super-strong-secret');
  } catch (err) {
    return next(new AuthError('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};
