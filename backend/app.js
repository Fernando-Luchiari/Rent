const express = require('express');

const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const uri = 'mongodb+srv://mongoUser:C@melus4@cluster0-dncr5.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(uri, {useNewUrlParser: true}).then(()=>{
    console.log('connected');
}).catch(err => {
    console.log(err);
});

app.use(cors());
app.use(bodyparser.json());


const userRoutes = require('./user');
app.use('/api/user', userRoutes);

module.exports= app;