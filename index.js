const express = require('express')
const {errorHandler, responseFormat} = require('./controllers/app.controller')
const rootRouter = require('./routers/root.router')
const app = express()
const port = process.env.PORT || 3012
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use("/", rootRouter);
app.use("/", errorHandler, responseFormat)
app.listen(port, () => {
  console.log(`API for movie booking ticket is ready on ${port}`)
})