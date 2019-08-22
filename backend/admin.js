const express = require('express');
const multer  = require('multer');
const Car = require('./models/car');
const User = require('./models/user');
const router = express.Router();
const mongodb = require('mongodb');

const storage = multer.diskStorage({
    
    destination: function (req,file,cb){
        cb(null,'./uploads')
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
});

const upload = multer({
    storage: storage
});

router.post('/save-image', upload.single('file'), (req,res,next) => {
    res.status(201).json('image uploaded');
});

router.post('/create-car', (req,res,next) => {
    const car = new Car ({
        brand: req.body.brand,
        model: req.body.model,
        power: req.body.power,
        seats: req.body.seats,
        imgUrl: req.body.imgUrl
    });
    car.save().then(result => {
        return res.status(200).json({message: 'car created'});
    }).catch(error => {
        console.log(error);
    })
});

router.get('/users', (req,res,next) =>{
    User.find({}, 'email isAdmin _id').then(user => {
        if(!user){
            return res.status(404).json({message: 'no users found'}); 
        }
        return res.status(200).json(user);        
    }).catch(error => {
        console.log(error);
    });
});

router.delete("/user/:id", (req,res,next) => {
    User.deleteOne({_id: new mongodb.ObjectID(req.params.id)}).then(result =>{
        return res.status(200).json({message: 'user deleted'});
    }).catch(error => {
        console.log(error);
    });

});

module.exports = router;
