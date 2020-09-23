const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://pokemon:ye4gOwB5hIuN5Nzt@pokemondb.guq4l.mongodb.net/pokedex?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(routes);



app.listen(3333);
