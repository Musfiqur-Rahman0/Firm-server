const { errorResponse } = require('../utils/response');

/**
 * Central error handling middleware
 * Must be registered LAST in Express app
 */
const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.url}:`, err.message);

  // Prisma errors
  if (err.code === 'P2002') {
    return errorResponse(res, `A record with this ${err.meta?.target?.join(', ')} already exists.`, 409);
  }
  if (err.code === 'P2025') {
    return errorResponse(res, 'Record not found.', 404);
  }
  if (err.code === 'P2003') {
    return errorResponse(res, 'Related record not found.', 400);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return errorResponse(res, 'Invalid token.', 401);
  }
  if (err.name === 'TokenExpiredError') {
    return errorResponse(res, 'Token has expired.', 401);
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    return errorResponse(res, err.message, 400);
  }

  // Default server error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return errorResponse(res, message, statusCode);
};

/**
 * 404 handler — for unmatched routes
 */
const notFoundHandler = (req, res) => {
  return errorResponse(res, `Route ${req.method} ${req.url} not found.`, 404);
};

module.exports = { errorHandler, notFoundHandler };