const rateLimit = require('express-rate-limit');
const { errorResponse } = require('../utils/response');

/**
 * General API rate limiter
 */
const generalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return errorResponse(res, 'Too many requests. Please try again later.', 429);
  },
});

/**
 * Strict limiter for auth routes (login/register)
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.AUTH_RATE_LIMIT_MAX) || 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return errorResponse(
      res,
      'Too many authentication attempts. Please wait 15 minutes before trying again.',
      429
    );
  },
});

module.exports = { generalLimiter, authLimiter };