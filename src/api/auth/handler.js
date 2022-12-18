const express = require('express');
const auth = require('../../middlewares/auth');
const validateSchema = require('../../middlewares/validateSchema');
const { postLoginSchema } = require('./schema');

const router = express.Router();

router.post('/login', validateSchema(postLoginSchema), async (req, res, next) => {
  try {
    const { authService } = req.container;
    const result = await authService.login(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/userinfo', auth(), async (req, res) => {
  res.json(req.user);
});

module.exports = router;
