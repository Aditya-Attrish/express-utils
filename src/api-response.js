class APIResponse {
  constructor(data = null, message = 'Success', metadata = {}, statusCode = 200) {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.metadata = metadata;
    this.timestamp = new Date().toISOString();
  }

  send(res) {
    return res.status(this.statusCode).json({
      statusCode: this.statusCode,
      success: this.success,
      data: this.data,
      message: this.message,
      metadata: this.metadata,
      timestamp: this.timestamp
    });
  }

  
}

export default APIResponse;