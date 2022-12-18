const { JsonWebTokenError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const ForbiddenError = require('../exceptions/ForbiddenError');
const UnauthorizedError = require('../exceptions/UnauthorizedError');

function auth(requiredRole = []) {
  return async (req, res, next) => {
    try {
      const authorization = req.headers.authorization || 'Bearer ';
      const token = authorization.split(' ')[1];
      const { sub } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const { userService } = req.container;
      const user = await userService.getUserById(sub);

      if (requiredRole.length > 0 && !requiredRole.includes(user.role)) {
        throw new ForbiddenError('action is protected.');
      }

      req.user = user;
      next();
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        next(new UnauthorizedError(e.message));
      } else {
        next(e);
      }
    }
  };
}

module.exports = auth;
