const connectToMongo = require('./db');
const express = require('express')

connectToMongo();
const app = express()
const port = 5000             // changing from 3000 to 5000 cause at port 3000 our reactjs server will run

app.use(express.json());      // middleware to hit for getting the response here

// available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})