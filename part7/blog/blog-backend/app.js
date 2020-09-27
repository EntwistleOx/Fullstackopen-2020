const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const middleware = require('./utils/middleware');
const config = require('./utils/config');
const logger = require('./utils/logger');
const blogRouter = require('./controllers/blog');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const app = express();

// require('./models/db');

logger.info('Connecting to', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.getToken);

app.get('/', (req, res) => {
  res.send('Hello humans! 👽');
});

app.use('/api/blogs', blogRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  // console.log(process.env.NODE_ENV);
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
