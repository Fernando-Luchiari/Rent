const express = require('express');
const router = express.Router();

const User = require('./models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res, next) => {
    res.status(200).json({message: 'response from nodejs'});
});

module.exports = router;

