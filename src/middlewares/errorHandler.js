const { ValidationError } = require('yup');
const HttpError = require('../exceptions/HttpError');

function errorHandler(err, req, res, next) {
  console.log(err);
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
    });
  } else if (err instanceof ValidationError) {
    res.status(400).json({
      statusCode: 400,
      message: err.message,
    });
  } else {
    res.status(500).json({
      statusCode: 500,
      message: 'internal server error.',
    });
  }
}

module.exports = errorHandler;
