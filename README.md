# Express API Utils 🚀

[![npm version](https://img.shields.io/npm/v/express-api-utils.svg)](https://www.npmjs.com/package/express-api-utils)
[![Downloads](https://img.shields.io/npm/dm/express-api-utils.svg)](https://www.npmjs.com/package/express-api-utils)
[![Bundle Size](https://img.shields.io/bundlephobia/min/express-api-utils)](https://bundlephobia.com/package/express-api-utils)
[![License](https://img.shields.io/npm/l/express-api-utils.svg)](https://github.com/your-username/express-api-utils/LICENSE)

A collection of utility functions for Express.js applications including error handling, async middleware, and standardized API responses. Now, for only modulejs.

## Features
-  **🚀 asyncHandler** - Clean async/await error handling
-  **🛡️ APIError** - Standardized error classes
- **📦 APIResponse** - Consistent API responses
- **🔧 errorHandler** - Global error handling middleware

## 🚀 Quick Start

### Installation
```bash
npm install express-api-utils
```

### Example
```js
import { asyncHandler, APIError, APIResponse } from 'express-api-utils';
import express from 'express';

const app = express();

app.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await getUserById(req.params.id);
  if (!user) throw APIError.notFound('User not found');
  return new APIResponse(user).send(res)
}));
```

```json
{
    "statusCode": 200,  # default 200 status code
    "success": true,    
    "data": {            # default null
        "id":1
    },
    "message": "Success",  # default message
    "metadata": {},          # default empty object
    "timestamp": "timestamp"  # current date
}
```

## [Getting started](./docs/GETTING_STARTED.md)

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
MIT © Aditya Attrish