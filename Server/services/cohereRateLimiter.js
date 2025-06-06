const rateLimit = require('express-rate-limit');

const cohereLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 50 requests per window
  message: 'Too many Cohere requests, please try again later',
  skip: (req) => {
    // Skip rate limiting for regex fallback
    return req.query.fallback === 'true';
  }
});

module.exports = cohereLimiter;