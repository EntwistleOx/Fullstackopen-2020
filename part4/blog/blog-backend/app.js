const express = require('express');
const cors = require('cors');

const middleware = require('./utils/middleware');
const blogRouter = require('./controllers/blog');

const app = express();

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.get('/', (req, res) => {
  res.send('Hello humans! 👽');
});

app.use('/api/blogs', blogRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
