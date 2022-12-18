const AuthService = require('../services/AuthService');
const UserService = require('../services/UserService');

function requestDecorator(req, res, next) {
  req.container = {
    authService: new AuthService(),
    userService: new UserService(),
  };
  next();
}

module.exports = requestDecorator;
