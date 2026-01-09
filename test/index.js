const {asyncHandler, APIResponse, APIError, errorHandler} = require('express-api-utils');

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    throw APIError.notFound('User not found');
  }
  
  return new APIResponse(user).send(res);
}));

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
