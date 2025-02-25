const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();
const app = express();
const port = 5000             // changing from 3000 to 5000 cause at port 3000 our reactjs server will run

app.use(cors())
app.use(express.json());      // middleware to hit for getting the response here

// available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook app listening on port ${port}`)
})