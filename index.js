const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');
const serverless = require('serverless-http');

connectToMongo();
const app = express();

app.use(cors());
app.use(express.json());

// available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

module.exports.handler = serverless(app);
