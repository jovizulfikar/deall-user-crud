const yup = require('yup');
const ObjectID = require('bson-objectid');
const { ROLE_ADMIN, ROLE_USER } = require('../../lib/constant');

ObjectID.isValid();

module.exports = {
  postUserSchema: yup.object({
    body: yup.object({
      name: yup.string().required(),
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    }),
  }),
  getUserSchema: yup.object({
    params: yup.object({
      id: yup.string().test('object-id', 'invalid id.', (value) => ObjectID.isValid(value)),
    }),
  }),
  deleteUserSchema: yup.object({
    params: yup.object({
      id: yup.string().test('object-id', 'invalid id.', (value) => ObjectID.isValid(value)),
    }),
  }),
  putUserSchema: yup.object({
    params: yup.object({
      id: yup.string().test('object-id', 'invalid id.', (value) => ObjectID.isValid(value)),
    }),
    body: yup.object({
      email: yup.string().notRequired().nullable().email(),
      role: yup.mixed().oneOf([ROLE_ADMIN, ROLE_USER]),
    }),
  }),
};
