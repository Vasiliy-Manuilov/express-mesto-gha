const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../errors/NotFoundError');
// const { requestLogger, errorLogger } = require('../middlewares/logger');

// app.use(requestLogger);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
// app.use(errorLogger);

router.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не существует'));
});

module.exports = router;
