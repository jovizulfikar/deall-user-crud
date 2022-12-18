class HttpError extends Error {
  constructor(message, code) {
    super(message);
    this.statusCode = code;
    this.name = 'HttpError';
  }
}

module.exports = HttpError;
