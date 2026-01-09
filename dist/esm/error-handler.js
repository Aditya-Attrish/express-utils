import APIError from './api-error.js';

/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  // Log error
  console.error('Error:', err);

  // If it's already an APIError, use it
  if (err instanceof APIError) {
    return res.status(err.statusCode).json(err.toJSON());
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const details = Object.values(err.errors).map(error => ({
      field: error.path,
      message: error.message
    }));
    const validationError = APIError.validationError('Validation failed', details);
    return res.status(validationError.statusCode).json(validationError.toJSON());
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const conflictError = APIError.conflict('Resource already exists');
    return res.status(conflictError.statusCode).json(conflictError.toJSON());
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const authError = APIError.unauthorized('Invalid token');
    return res.status(authError.statusCode).json(authError.toJSON());
  }

  if (err.name === 'TokenExpiredError') {
    const authError = APIError.unauthorized('Token expired');
    return res.status(authError.statusCode).json(authError.toJSON());
  }

  // Default to internal server error
  const internalError = APIError.internal();
  res.status(internalError.statusCode).json(internalError.toJSON());
};

export default errorHandler;