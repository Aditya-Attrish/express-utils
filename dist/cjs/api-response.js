"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
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
var _default = exports.default = APIResponse;