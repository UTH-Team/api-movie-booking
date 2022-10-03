const express = require('express')
const app = express()
const port = process.env.PORT || 3012

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`API for movie booking ticket is ready on ${port}`)
})