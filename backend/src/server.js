const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('ongodb+srv://pokemon:mw3szGZ1jFSZD6Gm@pokemondb.guq4l.mongodb.net/pokemonDB?retryWrites=true&w=majority')

app.use(express.json());
app.use(routes);



app.listen(3333);
