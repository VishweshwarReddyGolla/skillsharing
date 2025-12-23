const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const result = {
    success: false,
    error: message,
  };

  if (process.env.NODE_ENV === 'development') {
    result.stack = err.stack;
  }

  res.status(status).json(result);
};

module.exports = errorHandler;
