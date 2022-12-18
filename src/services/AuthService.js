const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../exceptions/UnauthorizedError');
const prisma = require('../lib/prisma');

class AuthService {
  constructor() {
    this._db = prisma;
  }

  async login({ email, password }) {
    const user = await this._db.user.findUnique({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedError('incorrect credentials.');
    }

    const accessToken = jwt.sign({ sub: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    return { accessToken };
  }
}

module.exports = AuthService;
