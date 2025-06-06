const rateLimit = require('express-rate-limit');

const cohereLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: 'Too many Cohere requests, please try again later',
  skip: (req) => {
    return req.query.fallback === 'true';
  }
});

module.exports = cohereLimiter;