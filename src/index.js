const express = require('express')
const { PrismaClient } = require('@prisma/client')
const routes = require('../routes');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const app = express();
const port = process.env.PORT || 3000;

// Parse incoming JSON data
app.use(express.json());

// Use defined routes
app.use('/', routes);

// Get config vars
dotenv.config();

// Access config var
process.env.TOKEN_SECRET;

// Start the server
const server = app.listen(port, () => 
  console.log(`Server listening at http://localhost:${port}`));

app.get('/', (req, res) => {
  res.send('Good luck!')
})

