const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');

connectToMongo();
const app = express();
const port = process.env.PORT || 5000;   // 🟰 dynamic port handling

app.use(cors());
app.use(express.json());

// available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Start the server
app.listen(port, () => {
  console.log(`iNotebook app listening at http://localhost:${port}`);
});