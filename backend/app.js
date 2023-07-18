require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const helmet = require('helmet');

const { errors } = require('celebrate');

const routes = require('./routes/index');

const cors = require('./middlewares/cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const errorHandler = require('./middlewares/error-handler');

const app = express();

const { PORT = 3000, DATABASE = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(DATABASE, {
  useNewUrlParser: true,
})
  .then(() => {
    console.log('База mongodb подключена');
    app.listen(PORT, (err) => {
      if (err) {
        console.log(err);
      }
      console.log(`Сервер запущен на ${PORT} порту`);
    });
  })
  .catch((err) => {
    console.log(`Ошибка подключения mongodb: ${err}`);
  });

app.use(express.json());
app.use(helmet());
app.use(cors);
// Логер запросов
app.use(requestLogger);

// Все роуты
app.use(routes);

// Логер ошибок
app.use(errorLogger);

// Валидация celebrate
app.use(errors());

// Централизованный обработчик ошибок
app.use(errorHandler);
