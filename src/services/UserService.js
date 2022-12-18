const bcrypt = require('bcrypt');
const BadRequestError = require('../exceptions/BadRequestError');
const NotFoundError = require('../exceptions/NotFoundError');
const { BCRYPT_SALT_ROUNDS, ROLE_ADMIN, ROLE_USER } = require('../lib/constant');
const prisma = require('../lib/prisma');

class UserService {
  constructor() {
    this._db = prisma;
  }

  async createUser({ name, email, password }) {
    const user = await this._db.user.findUnique({ where: { email } });

    if (user) {
      throw new BadRequestError('email already taken.');
    }

    const hashedPassword = bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);

    const { id } = await this._db.user.create({
      data: { name, email, password: hashedPassword },
    });

    return { id };
  }

  async getUserById(id) {
    const user = await this._db.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundError('user not found.');
    }

    delete user.password;
    return user;
  }

  async getUsers() {
    const users = await this._db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    return users;
  }

  async deleteUserById(id) {
    const user = await this._db.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundError('user not found.');
    }

    // verify admin role availability
    if (user.role === ROLE_ADMIN) {
      const adminCount = await this._db.user.count({ where: { role: ROLE_ADMIN } });

      if (adminCount < 2) {
        throw new BadRequestError('can\'t delete last available admin role.');
      }
    }

    const deletedUser = await this._db.user.delete({ where: { id } });

    return { id: deletedUser.id };
  }

  async updateUserById(id, {
    name, email, password, role,
  }) {
    const user = await this._db.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundError('user not found.');
    }

    user.name = name || user.name;
    user.role = role || user.role;
    user.password = password ? bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS) : user.password;

    // verify email duplication
    if (email && user.email !== email) {
      const userWithSameEmail = await this._db.user.findUnique({ where: { email } });

      if (userWithSameEmail) {
        throw new BadRequestError('email already taken.');
      }

      user.email = email;
    }

    // verify admin availablity
    if (role && user.role === ROLE_ADMIN && role === ROLE_USER) {
      const adminCount = await this._db.user.count({ where: { role: ROLE_ADMIN } });

      if (adminCount < 2) {
        throw new BadRequestError('can\'t change role of last available admin role.');
      }
    }

    const updatedUser = await this._db.user.update(
      {
        where: { id },
        data: { ...user, id: undefined },
      },
    );

    return { id: updatedUser.id };
  }
}

module.exports = UserService;
