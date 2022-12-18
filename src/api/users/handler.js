const express = require('express');
const { ROLE_ADMIN } = require('../../lib/constant');
const auth = require('../../middlewares/auth');
const validateSchema = require('../../middlewares/validateSchema');
const { postUserSchema, getUserSchema, deleteUserSchema } = require('./schema');

const router = express.Router();

router.post(
  '/',
  auth([ROLE_ADMIN]),
  validateSchema(postUserSchema),
  async (req, res, next) => {
    try {
      const { userService } = req.container;
      const result = await userService.createUser(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/',
  auth([ROLE_ADMIN]),
  async (req, res, next) => {
    try {
      const { userService } = req.container;
      const result = await userService.getUsers();
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/:id',
  auth([ROLE_ADMIN]),
  validateSchema(getUserSchema),
  async (req, res, next) => {
    try {
      const { userService } = req.container;
      const result = await userService.getUserById(req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  auth([ROLE_ADMIN]),
  validateSchema(deleteUserSchema),
  async (req, res, next) => {
    try {
      const { userService } = req.container;
      const result = await userService.deleteUserById(req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  auth([ROLE_ADMIN]),
  validateSchema(deleteUserSchema),
  async (req, res, next) => {
    try {
      const { userService } = req.container;
      const result = await userService.updateUserById(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
