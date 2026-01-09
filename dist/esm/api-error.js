class APIError extends Error {
  constructor(
    message = 'Internal Server Error',
    statusCode = 500,
    details = null,
    code = null
  ) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
    this.details = details;
    this.code = code;
    this.timestamp = new Date().toISOString();
    
    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      success: false,
      error: {
        message: this.message,
        code: this.code,
        statusCode: this.statusCode,
        details: this.details,
        timestamp: this.timestamp
      }
    };
  }

  // Common error types as static methods
  static badRequest(message = 'Bad Request', details = null) {
    return new APIError(message, 400, details, 'BAD_REQUEST');
  }

  static unauthorized(message = 'Unauthorized', details = null) {
    return new APIError(message, 401, details, 'UNAUTHORIZED');
  }

  static forbidden(message = 'Forbidden', details = null) {
    return new APIError(message, 403, details, 'FORBIDDEN');
  }

  static notFound(message = 'Not Found', details = null) {
    return new APIError(message, 404, details, 'NOT_FOUND');
  }

  static conflict(message = 'Conflict', details = null) {
    return new APIError(message, 409, details, 'CONFLICT');
  }

  static validationError(message = 'Validation Failed', details = null) {
    return new APIError(message, 422, details, 'VALIDATION_ERROR');
  }

  static internal(message = 'Internal Server Error', details = null) {
    return new APIError(message, 500, details, 'INTERNAL_ERROR');
  }
}

export default APIError;