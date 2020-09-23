const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const secret = require("./secret.json");

const urlConnection = secret.connectionString;

const app = express();

mongoose.connect(urlConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);



app.listen(3333);
