# Getting started
## Installation

```bash
npm install express-utils
```

## Usage

```js
import { asyncHandler, APIError, APIResponse, errorHandler } from 'express-utils';
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
  
  res.json(APIResponse.success(user));
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
- data (any): Response data (default: null)

- message (string): Success message (default: 'Success')
- metadata (object): Additional metadata (default: {})

#### Example
static Methods
```js
// Basic success
res.json(APIResponse.success(user));

// With custom message
res.json(APIResponse.success(user, 'User retrieved successfully'));

// Created response (201)
res.status(201).json(APIResponse.created(newUser));

// Paginated data
res.json(APIResponse.paginated(
  users,
  { page: 1, limit: 10, total: 150, pages: 15 },
  'Users retrieved successfully'
));
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
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "User retrieved successfully"
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