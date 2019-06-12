const express = require('express');

const cors = require('cors');
const bodyparser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyparser.json());


const userRoutes = require('./user');
app.use('/api/user', userRoutes);

module.exports= app;