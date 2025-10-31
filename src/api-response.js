class APIResponse {
  constructor(data = null, message = 'Success', metadata = {}) {
    this.success = true;
    this.data = data;
    this.message = message;
    this.metadata = metadata;
    this.timestamp = new Date().toISOString();
  }

  toJSON() {
    return {
      success: this.success,
      data: this.data,
      message: this.message,
      metadata: this.metadata,
      timestamp: this.timestamp
    };
  }

  // Common response types as static methods
  static success(data = null, message = 'Success', metadata = {}) {
    return new APIResponse(data, message, metadata);
  }

  static created(data = null, message = 'Resource created successfully') {
    return new APIResponse(data, message, { statusCode: 201 });
  }

  static paginated(data, pagination, message = 'Success') {
    return new APIResponse(data, message, { pagination });
  }
}

export default APIResponse;