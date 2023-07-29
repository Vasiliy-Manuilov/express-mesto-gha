const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const handelError = require('./middlewares/handelError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const { URL_REGEX } = require('./utils/constants');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();
app.use(requestLogger);
app.use(helmet());

app.use(bodyParser.json());
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi
      .string()
      .pattern(URL_REGEX),
  }),
}), createUser);
app.use(cookieParser());
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
app.use(auth);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(handelError);

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
