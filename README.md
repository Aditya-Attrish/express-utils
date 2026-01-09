# express-api-utils — small, predictable helpers for Express APIs 🚀

[![npm version](https://img.shields.io/npm/v/express-api-utils.svg)](https://www.npmjs.com/package/express-api-utils)
[![Downloads](https://img.shields.io/npm/dm/express-api-utils.svg)](https://www.npmjs.com/package/express-api-utils)
[![Bundle Size](https://img.shields.io/bundlephobia/min/express-api-utils)](https://bundlephobia.com/package/express-api-utils)
[![License](https://img.shields.io/npm/l/express-api-utils.svg)](LICENSE)

Fast, minimal utilities to standardize API responses and error handling in Express applications. Designed for modern Node (ESM-friendly) and zero ceremony integration.

Why use this package?
- Small focused API (asyncHandler, APIError, APIResponse, errorHandler). Minimal surface area to learn.
- Works with async/await and Express error middleware patterns.
- Provides a consistent, JSON-first response shape for success and errors—great for frontend teams and API consumers.

Table of contents
- Installation
- Quick start
- Examples (ESM)
- API reference
- Migration notes
- Contributing & Support

Installation

Install from npm:

```bash
npm install express-api-utils
```

Quick start (ESM)

```js
import express from 'express';
import { asyncHandler, APIError, APIResponse, errorHandler } from 'express-api-utils';

const app = express();

app.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await getUserById(req.params.id); // your DB call
  if (!user) throw APIError.notFound('User not found');
  return new APIResponse(user).send(res);
}));

// register last
app.use(errorHandler);

app.listen(3000);
```

Quick start (CommonJS)

```js
const express = require('express');
const { asyncHandler, APIError, APIResponse, errorHandler } = require('express-api-utils');

const app = express();

app.get('/ping', asyncHandler(async (req, res) => {
  return new APIResponse({ ping: 'pong' }).send(res);
}));

app.use(errorHandler);

app.listen(3000);
```

What you'll get
- Consistent success response shape:

```json
{
  "statusCode": 200,
  "success": true,
  "data": {...},
  "message": "Success",
  "metadata": {},
  "timestamp": "2025-11-05T...Z"
}
```

- Error responses normalized via `APIError` and the global `errorHandler`. 400/401/404/500 handled consistently.

API reference

- asyncHandler(fn)
  - Wraps async route handlers and forwards any thrown errors to next(). Usage: `app.get('/', asyncHandler(async (req,res)=>{}))`.

- APIError
  - Factory for error responses and helper constructors (e.g. `APIError.notFound('message')`, `APIError.unauthorized('...')`). Contains status code and payload.

- APIResponse
  - Small helper to build/send consistent success responses. Example: `new APIResponse(data, { message:'Fetched' }).send(res)`.

- errorHandler
  - Express error middleware. Convert thrown errors (including `APIError`) into JSON responses. Attach at the end of middleware chain.

Examples and tips

- Throwing a not-found error:

```js
if (!row) throw APIError.notFound('User not found');
```

- Returning a paginated response:

```js
const resp = new APIResponse(data, { message: 'List', metadata: { page, pageSize, total } });
resp.send(res);
```

Customization

The package is intentionally small; if you want different shapes, wrap `APIResponse` or write a tiny adapter around `errorHandler` to transform errors to your preferred schema.

Migration notes

- The package is ESM-ready and also supports CommonJS `require()`.
- If you previously used a custom error middleware, move `app.use(errorHandler)` to the end of your middleware chain.

Contributing

Contributions, issues, and feature requests are welcome. A great first contribution is adding an example under an `examples/` folder.

Guidelines
- Fork the repo, open a feature branch, and send a PR.
- Run any existing tests and add a small test when fixing a bug.

Support & sponsorship

If this package saved you time, consider starring the repo or sponsoring future work.

License

MIT © Aditya Attrish

Links
- Getting started guide: `./docs/GETTING_STARTED.md`
- Source: repository root

