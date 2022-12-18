const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');
const requestDecorator = require('./middlewares/requestDecorator');
const authRouter = require('./api/auth');
const usersRouter = require('./api/users');
const routeNotFoundHandler = require('./middlewares/routeNotFoundHandler');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config({ path: '.env' });

const app = express();

// decorate request
app.use(requestDecorator);

// body parser
app.use(bodyParser.json());

// register routes
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

// route not found handler
app.use('*', routeNotFoundHandler);

// error handling
app.use(errorHandler);

const port = process.env.APP_PORT || 8000;

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
