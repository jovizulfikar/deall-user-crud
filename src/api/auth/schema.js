const yup = require('yup');

module.exports = {
  postLoginSchema: yup.object({
    body: yup.object({
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    }),
  }),
};
