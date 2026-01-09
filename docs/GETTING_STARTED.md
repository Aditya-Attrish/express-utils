# Getting started
## Installation

```bash
npm install express-utils
```

## Usage

```js
import { asyncHandler, APIError, APIResponse, errorHandler } from 'express-api-utils';
```

```js
const { asyncHandler, APIResponse, APIError, errorHandler } = require('express-api-utils');
```

### API Reference
### asyncHandler(fn)

Wraps async route handlers and automatically passes errors to Express's error handling middleware.

Parameters:
- fn (Function): Async function that takes (req, res, next)
Returns: Express middleware function

#### Example
```js
app.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    throw APIError.notFound('User not found');
  }
  
  return new APIResponse(user).send(res);
}));
```

### APIError
A custom Error class for standardized API errors.

Parameters:
- message (string): Error message (default: 'Internal Server Error')
- statusCode (number): HTTP status code (default: 500)
- details (any): Additional error details (default: null)

```js
// Basic usage
throw new APIError('Custom error message', 400);

// Convenience methods
throw APIError.notFound('User not found');
throw APIError.validationError('Email is required');
throw APIError.unauthorized('Invalid credentials');

// With additional details
throw APIError.validationError('Invalid input', {
  fields: {
    email: 'Must be valid email',
    password: 'Must be at least 8 characters'
  }
});
```

### APIResponse
Standardized success response formatter.

Parameters:
- statusCode (Number) Response status code (default: 200)
- data (any): Response data (default: null)
- message (string): Success message (default: 'Success')
- metadata (object): Additional metadata (default: {})

#### Example
static Methods
```js
return new APIResponse().send(res)
```

### errorHandler
Global error handling middleware. Must be the last middleware in your Express app.

#### Example
```js
import express from 'express';
import { errorHandler } from 'express-utils';

const app = express();

// ... all your routes and middleware

// Must be last
app.use(errorHandler);
```

## Respone Formats
### Success Response
```json
{
  "statusCode": 200,
  "success": true,    
  "data": null,
  "message": "Success",
  "metadata": {},
  "timestamp": "timestamp"
}
```

Error Response
```json
{
  "success": false,
  "error": {
    "message": "User not found",
    "statusCode": 404,
    "details": null
  }
}
```