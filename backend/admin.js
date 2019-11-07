const express = require('express');
const multer  = require('multer');
const Car = require('./models/car');
const User = require('./models/user');
const Reservation = require('./models/reservation');
const router = express.Router();
const mongodb = require('mongodb');

const storage = multer.diskStorage({
    
    destination: function (req,file,cb){
        cb(null,'./backend/uploads')
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

router.post("/admin-user",(req,res)=>{
    User.findOneAndUpdate({_id: new mongodb.ObjectID(req.body.id)},{$set: {isAdmin: 1}},{new: true}).then(result =>{
        return res.status(200).json({message: 'user updated'});
    }).catch(error => {
        console.log(error);
    });
});

router.post("/cars",(req,res)=>{
    Reservation.find().or([{$and:[{from: {$lte: req.body.from}}, {until: {$gte: req.body.from}}]},
        {$and:[{from: {$lte: req.body.until}}, {until: {$gte: req.body.until}}]},
        {$and:[{from: {$gt: req.body.from}}, {until: {$lt: req.body.until}}]}
    ]).then(cars=>{
        if(cars[0] === undefined){ 
            Car.find().then(car =>{
                return res.status(200).json(car);
            }).catch(error => {
                console.log(error);               
            });
        }else{
            Car.find({_id:{$ne: cars[0].car_id}}).then(car3=>{
                return res.status(201).json(car3);
            }).catch(error => {
                console.log(error);               
            });
        }
    }).catch(error => {
        console.log(error);
    });
});

router.post('/rent',(req,res) =>{
    const reserve = new Reservation({
        car_id: req.body.car_id,
        from: req.body.from,
        until: req.body.until,
        fromDate: req.body.fromDate,
        untilDate: req.body.untilDate
    });

    reserve.save().then(response => {
        return res.status(200).json('Car rented!');
    }).catch(erro => {
        console.log(erro);
    });
});

router.get('/rented-cars',(req,res)=>{
    Reservation.find().then(reserve => {
        return res.status(200).json(reserve);
    }).catch(erro => {
        console.log(erro);
    });
});

router.delete('/cancel-reservation', (req,res)=>{
    Reservation.deleteOne({_id: new mongodb.ObjectID(req.params.id)}).then(result =>{
        return res.status(200).json({message: 'reserve cancelled'});
    }).catch(error => {
        console.log(error);
    });
});

module.exports = router;
