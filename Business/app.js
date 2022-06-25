const express = require('express');
require('dotenv').config();
const cors = require('cors');
const routes = require('./src/routes');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/itau-devs', routes.movies);

app.use('/itau-devs/user', routes.userRegister);

app.use('/itau-devs', routes.userLogin);

app.use('/itau-devs', routes.getMovieByTitle);


app.use((_req, res) => {
  res.status(404).send('Endpoint not found');
});

module.exports = { app };
