const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const dbURI = process.env.DB_URI;
const dbName = process.env.DB_NAME;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to database ${dbName}`);
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(`Error connecting to database: ${err.message}`);
  });