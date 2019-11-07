const express = require('express');
const path = require('path');

const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const uri = 'mongodb+srv://mongoUser:C@melus4@cluster0-dncr5.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(uri, {useNewUrlParser: true}).then(()=>{
    console.log('connected to mongo');
}).catch(err => {
    console.log(err);
});

app.use(cors());
app.use(bodyparser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const userRoutes = require('./user');
const adminRoutes = require('./admin');
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

module.exports= app;