const connectToMongo = require('./db');
const express = require('express')

connectToMongo();
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello Ack Wolver!')
})

app.get('/api/login', (req, res) => {             // for login of the user
  res.send('Hello Ack Wolver!')
})

app.get('/api/signup', (req, res) => {            // for signup page here
  res.send('Hello User Sign Up here!')
})

// available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})