const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const { BCRYPT_SALT_ROUNDS } = require('../../src/lib/constant');

const users = [
  {
    name: faker.name.fullName(),
    email: 'admin@deall.com',
    password: bcrypt.hashSync('password', BCRYPT_SALT_ROUNDS),
    role: 'admin',
  },
  {
    name: faker.name.fullName(),
    email: 'user@deall.com',
    password: bcrypt.hashSync('password', BCRYPT_SALT_ROUNDS),
    role: 'user',
  },
];

module.exports = users;
