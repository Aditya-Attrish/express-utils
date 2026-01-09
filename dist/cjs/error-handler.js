"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _apiError = _interopRequireDefault(require("./api-error.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  // Log error
  console.error('Error:', err);

  // If it's already an APIError, use it
  if (err instanceof _apiError.default) {
    return res.status(err.statusCode).json(err.toJSON());
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const details = Object.values(err.errors).map(error => ({
      field: error.path,
      message: error.message
    }));
    const validationError = _apiError.default.validationError('Validation failed', details);
    return res.status(validationError.statusCode).json(validationError.toJSON());
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const conflictError = _apiError.default.conflict('Resource already exists');
    return res.status(conflictError.statusCode).json(conflictError.toJSON());
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const authError = _apiError.default.unauthorized('Invalid token');
    return res.status(authError.statusCode).json(authError.toJSON());
  }
  if (err.name === 'TokenExpiredError') {
    const authError = _apiError.default.unauthorized('Token expired');
    return res.status(authError.statusCode).json(authError.toJSON());
  }

  // Default to internal server error
  const internalError = _apiError.default.internal();
  res.status(internalError.statusCode).json(internalError.toJSON());
};
var _default = exports.default = errorHandler;