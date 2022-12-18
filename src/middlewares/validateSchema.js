function validateSchema(schema) {
  return async (req, res, next) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e) {
      next(e);
    }
  };
}

module.exports = validateSchema;
