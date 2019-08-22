const express = require('express');
const router = express.Router();

const User = require('./models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/login',(req,res,next)=>{
    let fetchUser;
    User.findOne({email: req.body.email}).then(user =>{
        fetchUser = user;
        if(!user){
            return res.status(404).json({message: 'Auth failed!'});
        }
        return bcrypt.compare(req.body.password,user.password);
    }).then(result => {
        if(!result){
            return res.status(404).json({message: 'Auth failed!'});  
        }
        let administrator = fetchUser.isAdmin;
        let token = jwt.sign({email: fetchUser.email,userid: fetchUser._id},'secret-long',{expiresIn: '1h'});
        return res.status(200).json({token: token,expiresIn: 3600,admin: administrator});
    }).catch(err =>{
        console.log(err);
    });

});


router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password,10).then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash,
            isAdmin: 0
        })
        user.save().then(result => {
            return res.status(200).json({message: 'user signup'});
        }).catch(error => {
            console.log(error);
        })
    })
    
});






module.exports = router;

