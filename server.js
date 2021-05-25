const bodyparser = require('body-parser');
const express = require('express');

const escolarroute = require('./router/escolar.router')();

let app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.use('/v1/control_escolar', escolarroute);

module.exports = app;