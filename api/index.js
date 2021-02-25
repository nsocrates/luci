const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
// const api = require('./routes')
const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Register routes
// app.use('/api', api)

app.get('*', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
