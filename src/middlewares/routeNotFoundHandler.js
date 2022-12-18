function routeNotFoundHandler(req, res) {
  res.status(404).json({
    statusCode: 404,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
}

module.exports = routeNotFoundHandler;
